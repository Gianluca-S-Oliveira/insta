import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import 'firebase/compat/auth';
import Posts from '../Posts/PostsList/Posts';
import AddPost from '../Posts/NewPost/AddPost';


function getModalStyle() {
    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Home = () => {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = useState(false);
    const [openSignin, setOpensignin] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, setUser] = useState(null);

    const [posts, setposts] = useState([]);


    const signUp = (event) => {
        event.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                });
            })
            .catch((error) => alert(error.message));

        setOpen(false);
        // window.location.reload(false);
    };

    const signIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));

        setOpensignin(false);
        // window.location.reload(false);
    };


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [user, username]);

    useEffect(() => {
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setposts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                );
            });
    }, []);

    return (
        <div className="app">


            {user ? (

                <Link to="/" onClick={() => auth.signOut()}>sair</Link>
            ) : (
                <div>

                </div>
            )}

            {user && user.displayName ? (
                <>
                    aaa
                    <AddPost username={user.displayName} />
                </>
            ) : (
                <div className='unauth'>
                </div>
            )}

            <div className="app__posts">
                <div className="app__postright">

                    <br />
                    {posts.map(({ id, post }) => (
                        <Posts
                            key={id}
                            postId={id}
                            user={user}
                            userName={post.userName}
                            caption={post.caption}
                            imageURL={post.imageURL}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
