import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";

import { BiAdjust } from "react-icons/bi";

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BotaoCustomizado from "../../Componentes/Botao/botao";
import { useNavigate } from 'react-router-dom';
import InputDefault from "../../Componentes/Inputs/input";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import logo from "../../assets/imagens/logo.png"
import imagem1 from "../../assets/imagens/login-1.jpg"
import "./login.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Login = () => {
    const notify = () => toast("Wow so easy!");

    const navigate = useNavigate();
    const classes = useStyles();
    const [openSignin, setOpensignin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = (event) => {
        event.preventDefault(event);
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("logado");
                navigate('/home');
            })
            .catch((error) => toast.error("Email ou senha inválidos! Por favor, tente novamente", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }));

    };

    return (
        <form className='formulario'>
            <div className="image_container">
                <img
                    className="imagem1"
                    src={imagem1}
                    alt=""

                />
            </div>

            <br></br>

            <div className="campos_login">
                <img
                    className="app__headerImage"
                    src={logo}
                    alt=""

                />
                <h1>Bem Vindo ao  <span className="span">Helpets!</span> <p>faça login e encontre um amigo de 4 patas!</p></h1>
                <InputDefault
                    icon={<AiOutlineMail />}
                    placeholder="Digite seu email..."
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>
                <InputDefault
                    icon={<RiLockPasswordFill />}
                    placeholder="Digite sua senha..."
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
                <br></br>
                <BotaoCustomizado type="submit" onClick={signIn} >
                    Entrar
                </BotaoCustomizado>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <br />
                <Link to="/cadastro"  >
                    Não possui cadastro? <span className="span"> cadastre-se aqui</span>
                </Link>
            </div>

        </form >


    );
}

export default Login;
