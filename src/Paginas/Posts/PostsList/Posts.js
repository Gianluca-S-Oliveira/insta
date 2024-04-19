import { FiMail } from "react-icons/fi";
import { RiTimeFill } from "react-icons/ri";
import { AiOutlineComment } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import React, { useState, useEffect } from 'react';
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../../firebase";
import { Button } from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "./Posts.scss"

function getColorForUser(username) {
    const hash = username
        .split('')
        .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 360, 0);

    return `hsl(${hash}, 70%, 50%)`;
}
function Posts({ postId, user, userName, caption, imageURL, numero }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editComment, setEditComment] = useState('');
    const [commentID, setCommentID] = useState('');
    const [show, setShow] = useState(false);
    const [postTimestamp, setPostTimestamp] = useState(null); // Estado para armazenar o timestamp do post
    const [timeAgo, setTimeAgo] = useState('');

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
        if (postId) {
            db.collection("posts")
                .doc(postId)
                .get()
                .then(doc => {
                    if (doc.exists && doc.data().timestamp) { // Verifica se o documento existe e se possui o campo timestamp
                        setPostTimestamp(doc.data().timestamp);

                        const postDate = doc.data().timestamp.toDate();
                        const currentDate = new Date();
                        const difference = currentDate.getTime() - postDate.getTime();
                        const seconds = Math.floor(difference / 1000);

                        if (seconds < 60) {
                            setTimeAgo('Postado Agora mesmo');
                        } else if (seconds < 3600) {
                            const minutes = Math.floor(seconds / 60);
                            setTimeAgo(`há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`);
                        } else if (seconds < 86400) {
                            const hours = Math.floor(seconds / 3600);
                            setTimeAgo(`há ${hours} ${hours === 1 ? 'hora' : 'horas'}`);
                        } else {
                            const days = Math.floor(seconds / 86400);
                            setTimeAgo(`há ${days} ${days === 1 ? 'dia' : 'dias'}`);
                        }
                    } else {
                        console.error("Documento não encontrado ou sem campo 'timestamp'.");
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
        console.log("Informações do Usuário:", user.email);
    }, [user]);

    return (
        <div className="post">
            {user.displayName === userName && (
                <DeleteForeverIcon
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => {
                        db.collection("posts")
                            .doc(postId).delete()
                    }}
                />
            )}

            <div className="post__header">
                <div className='user_info'>
                    <div>
                        <Avatar
                            className="post__avatar"
                            alt={userName}
                            src=" "
                            style={{ backgroundColor: getColorForUser(userName) }} // Chamando a função getColorForUser com o nome de usuário
                        />
                        <h3>{userName}</h3>
                    </div>


                    <a href={`https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new`}>
                        <button><FiMail /></button>
                    </a>
                </div>
                <p className="post__text">
                    {caption}
                </p>

            </div> {
                postTimestamp && (
                    <p className="post__timestamp">
                        Postado {timeAgo}
                    </p>
                )
            }
            <div className="image_container<RiTimeFill />">
                <img
                    className="post__image"
                    src={imageURL}
                />
            </div>

            <div>
                <div>
                    <AiOutlineHeart />Curtidas
                </div>
                <div>
                    <AiOutlineComment />Comentar
                </div>


            </div>


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
                                    style={{ color: 'blue', cursor: 'pointer' }}
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
            {
                user && show && (
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
                )
            }
            {
                user && (
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
                            PUBLICAR
                        </Button>

                    </form>
                )
            }
        </div >
    );
}

export default Posts;
