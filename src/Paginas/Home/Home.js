import React, { useState, useEffect } from 'react'

import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import 'firebase/compat/auth';
import Posts from '../Posts/PostsList/Posts';
import AddPost from '../Posts/NewPost/AddPost';

import Header from "../../Componentes/Header/header";


const Home = () => {



    const [username, setUsername] = useState("");


    const [user, setUser] = useState(null);

    const [posts, setposts] = useState([]);




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
        <div className="app" style={{ backgroundColor: '#DCDCDC' }}>

            {user && user.displayName ? (
                <>
                    <Header username={user.displayName} />
                </>
            ) : (
                <div className='unauth'>
                </div>
            )}




            {user && user.displayName ? (
                <>
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
