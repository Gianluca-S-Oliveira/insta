import React, { useState } from 'react';
import { storage, db } from "../../../firebase";
import { BsFillEmojiSmileFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import { AiFillCamera } from "react-icons/ai";
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import 'firebase/compat/storage';
import BotaoCustomizado from "../../../Componentes/Botao/botao";
import InputDefault from "../../../Componentes/Inputs/input";

import "./novoPost.scss";

function AddPost({ username }) {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [showEmojis, setShowEmojis] = useState(false);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const toggleEmojis = () => {
        setShowEmojis(!showEmojis);
    };

    const addEmoji = (emoji) => {
        setCaption(prevCaption => prevCaption + emoji);
        setShowEmojis(false);
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageURL: url,
                            userName: username
                        });
                    });
            }
        );
        setCaption('');
        setImage(null);
    };

    return (
        <div className="imagesupload">
            <br />
            <p>Olá {username.substr(0, 1).toUpperCase() + username.substr(1, username.length)}, como irá ajudar hoje?</p>
            <div className="post_input">
                <h2 className="name">{username.substr(0, 1).toUpperCase()}</h2>
                <InputDefault id="filled-basic" label="Caption here" variant="filled" onChange={event => setCaption(event.target.value)} value={caption} />
            </div>

            <br />
            <p onClick={toggleEmojis}><BsFillEmojiSmileFill /> Emoji</p>
            {showEmojis && (
                <div className="emoji-modal">
                    <span className="emoji" role="img" aria-label="Smile Emoji" onClick={() => addEmoji('😊')}>😊</span>
                    <span className="emoji" role="img" aria-label="Heart Emoji" onClick={() => addEmoji('❤️')}>❤️</span>
                    <span className="emoji" role="img" aria-label="Star Emoji" onClick={() => addEmoji('⭐️')}>⭐️</span>
                    <span className="emoji" role="img" aria-label="Crying Emoji" onClick={() => addEmoji('😢')}>😢</span>
                    <span className="emoji" role="img" aria-label="Thinking Emoji" onClick={() => addEmoji('🤔')}>🤔</span>
                    <span className="emoji" role="img" aria-label="Heart Eyes Emoji" onClick={() => addEmoji('😍')}>😍</span>
                    <span className="emoji" role="img" aria-label="Thumbs Up Emoji" onClick={() => addEmoji('👍')}>👍</span>
                    <span className="emoji" role="img" aria-label="Thumbs Down Emoji" onClick={() => addEmoji('👎')}>👎</span>
                    <span className="emoji" role="img" aria-label="Dog Emoji" onClick={() => addEmoji('🐶')}>🐶</span>
                    <span className="emoji" role="img" aria-label="Cat Emoji" onClick={() => addEmoji('🐱')}>🐱</span>
                    <span className="emoji" role="img" aria-label="Paw Prints Emoji" onClick={() => addEmoji('🐾')}>🐾</span>
                    <span className="emoji" role="img" aria-label="Fish Emoji" onClick={() => addEmoji('🐟')}>🐟</span>
                    <span className="emoji" role="img" aria-label="Bird Emoji" onClick={() => addEmoji('🐦')}>🐦</span>
                    <span className="emoji" role="img" aria-label="Rabbit Emoji" onClick={() => addEmoji('🐰')}>🐰</span>
                    <span className="emoji" role="img" aria-label="Hamster Emoji" onClick={() => addEmoji('🐹')}>🐹</span>
                    {/* Adicione mais emojis conforme necessário */}
                </div>
            )}

            <label htmlFor="teste" className="btnPerson"><AiFillCamera /> Foto</label>
            <input id="teste" className='file-input' type="file" onChange={handleChange} />

            <BotaoCustomizado variant="contained" color='primary' onClick={handleUpload}>
                Publicar <BsFillArrowRightSquareFill />
            </BotaoCustomizado>
            {/* <progress className="progress" value={progress} max="100" /> */}
        </div>
    );
}

export default AddPost;
