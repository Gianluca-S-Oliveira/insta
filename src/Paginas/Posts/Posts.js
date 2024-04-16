import React, { useState, useEffect } from 'react';
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import { Button } from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";

function Posts({ postId, user, userName, caption, imageURL, numero }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editComment, setEditComment] = useState('');
    const [commentID, setCommentID] = useState('');
    const [show, setShow] = useState(false);
    const [postTimestamp, setPostTimestamp] = useState(null); // Estado para armazenar o timestamp do post

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map(doc => ({
                        id: doc.id,
                        comment: doc.data(),
                    })));
                });
        }
        return () => {
            unsubscribe && unsubscribe();
        };
    }, [postId]);

    useEffect(() => {
        // Consulta para obter o timestamp do post
        if (postId) {
            db.collection("posts").doc(postId).get()
                .then(doc => {
                    if (doc.exists) {
                        setPostTimestamp(doc.data().timestamp);
                    }
                })
                .catch(error => {
                    console.error("Erro ao obter o timestamp do post:", error);
                });
        }
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: newComment,
            username: user.displayName,
            numero: user.phoneNumber,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setNewComment('');
    };

    const handleEdit = (id, txt) => {
        setShow(true);
        setEditComment(txt);
        setCommentID(id);
    };

    const updateComment = () => {
        db.collection("posts")
            .doc(postId)
            .collection("comments")
            .doc(commentID).update({
                text: editComment
            });
        setShow(false);
    };

    useEffect(() => {
        console.log("Informações do Usuário:", user);
    }, [user]);

    return (
        <div className="post">


            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={userName}
                    src=" "
                />
                <h3>{userName}</h3>
                {postTimestamp && (
                    <p className="post__timestamp">
                        Postado em: {new Date(postTimestamp.toDate()).toLocaleString()}
                    </p>
                )}
            </div>

            <img
                className="post__image"
                src={imageURL}
            />

            <p className="post__text">
                <b>{userName}</b>: {caption}
            </p>

            <div className="post__comments">
                {comments.map(({ id, comment }) => (
                    <p key={id}>
                        <b>{comment.username}</b>: &nbsp;{comment.text}
                        {(comment.username === user?.displayName || user?.displayName === userName) && (
                            <>
                                <EditIcon
                                    style={{ color: 'blue', cursor: 'pointer' }}
                                    onClick={() => handleEdit(id, comment.text)}
                                />
                                <DeleteOutlineIcon
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={() => {
                                        db.collection("posts")
                                            .doc(postId)
                                            .collection("comments")
                                            .doc(id).delete()
                                    }}
                                />
                            </>
                        )}
                    </p>
                ))}
            </div>

            {user && show && (
                <form className="post__commentbox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Edit comment..."
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                    />
                    <Button
                        className="post__button"
                        disabled={!editComment}
                        type="submit"
                        onClick={updateComment}
                    >
                        Update
                    </Button>
                </form>
            )}

            {user && (
                <form className="post__commentbox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                        className="post__button"
                        disabled={!newComment}
                        type="submit"
                        onClick={postComment}
                    >
                        POST
                    </Button>
                    {user.displayName === userName && (
                        <DeleteForeverIcon
                            style={{ color: 'red', cursor: 'pointer' }}
                            onClick={() => {
                                db.collection("posts")
                                    .doc(postId).delete()
                            }}
                        />
                    )}
                </form>
            )}
        </div>
    );
}

export default Posts;
