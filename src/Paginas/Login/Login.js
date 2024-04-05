import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import logo from "../../assets/imagens/logo.png"
import imagem1 from "../../assets/imagens/login-1.jpg"
import "./login.scss"
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
    const classes = useStyles();
    const [openSignin, setOpensignin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));

        setOpensignin(false);
    };

    return (

        <form className='formulario'>
            <div>
                <img
                    className="imagem1"
                    src={imagem1}
                    alt=""

                />
            </div>
            <center>
                <img
                    className="app__headerImage"
                    src={logo}
                    alt=""

                />
            </center>
            <br></br>
            <h1>Bem Vindo ao  <span>Helpets</span></h1>
            <p>faça login e encontre um amigo de 4 patas!</p>
            <Input
                placeholder="Digite seu email..."
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <Input
                placeholder="Digite sua senha..."
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

            />
            <br></br>
            <Button type="submit" onClick={signIn}>
                <Link to="/home" >
                    Entrar
                </Link>
            </Button>
            <br />
            <Link to="/cadastro" >
                Não possui cadatro? <span> cadastre-se aqui</span>
            </Link>
        </form >

    );
}

export default Login;
