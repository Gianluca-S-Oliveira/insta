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
import Posts from './../PostsList/Posts';

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
                console.log("aaaa" + username)
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
                        })
                    })

            }
        )
        setCaption(' ')
        setImage(null)
    }
    const inputElement = document.getElementById('teste');

    return (
        <div className="imagesupload">
            <br />
            <div className="post_input">
                <h2 className="name">{username.substr(0, 1).toUpperCase()}</h2>
                <InputDefault id="filled-basic" placeholder={`Olá ${username.substr(0, 1).toUpperCase() + username.substr(1, username.length)}, como irá ajudar hoje?`} label="Caption here" variant="filled" onChange={event => setCaption(event.target.value)} value={caption} />
            </div>

            <br />
            <div className='acoes'>
                <div className='emojis'>
                    <p onClick={toggleEmojis} ><BsFillEmojiSmileFill /> Emoji</p>
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

                        </div>
                    )}

                </div>
                <div className='foto'>
                    <input style={{ opacity: -1 }} className='file-input' type="file" id="teste" onChange={handleChange} />
                    {inputElement !== null && inputElement.addEventListener('change', () => {
                        if (inputElement.files.length > 0) {
                            console.log('Nome do arquivo:', inputElement.files[0].name);
                        } else {
                            console.log('Nenhum arquivo selecionado.');
                        }
                    })}

                    <label htmlFor="teste" className="btnPerson" onChange={handleChange}> <AiFillCamera /> Foto</label>

                </div>

            </div>
            {inputElement !== null && inputElement.files.length > 0 && (
                <p>Nome do arquivo: {inputElement.files[0].name}</p>
            )}
            <BotaoCustomizado variant="contained" color='primary' onClick={handleUpload} className='button'>
                Publicar <BsFillArrowRightSquareFill />
            </BotaoCustomizado>
        </div>
    );
}

export default AddPost;
