import React, { useState, useEffect } from 'react'

import { db, auth } from "../../firebase";
import 'firebase/compat/auth';
import FIAPLogo from '../../assets/imagens/fiap-logo.jpg'; // Importe o logo da FIAP
import QRCode from '../../assets/imagens/qrcode-pix.png';
import Footer from '../../Componentes/Footer/';
import Header from "../../Componentes/Header/header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./pagamento.scss"
function Pagamento() {

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
        <> <div className="reasons">

            {user && user.displayName ? (
                <>
                    <Header username={user.displayName} />
                </>
            ) : (
                <div className='unauth'>
                </div>
            )}
        </div>
            <footer className="pagamento-container">
                <div className="pagamento-content">
                    <div className="pagamento-text">
                        <p>Quase lá! Realize o pagamento do código QR
                            para possuir acesso aos seus  benefícios Premium!.</p>
                    </div>
                    <div className="qr-code">
                        <img src={QRCode} alt="Logo da FIAP" />

                    </div>

                </div>
            </footer>
        </>



    )
}

export default Pagamento

