import React, { useState, useEffect } from 'react'

import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import 'firebase/compat/auth';
import Posts from '../Posts/PostsList/Posts';
import AddPost from '../Posts/NewPost/AddPost';

import Header from "../../Componentes/Header/header";


function Justificativa() {

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



    return (
        <div className="reasons">

            {user && user.displayName ? (
                <>
                    <Header username={user.displayName} />
                </>
            ) : (
                <div className='unauth'>
                </div>
            )}

            <section>           aaaaaaaaaaaaaaaaaa</section>




        </div>
    )
}

export default Justificativa

