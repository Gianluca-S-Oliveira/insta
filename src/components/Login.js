import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
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

        <form className="app__signup">
            <center>
                <img
                    className="app__headerImage"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
                    alt=""
                    width={'180'}
                    height={'60'}
                />
            </center>
            <br></br>
            <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <Button type="submit" onClick={signIn}>
                <Link to="/home" >
                    navegar
                </Link>
            </Button>
            <Link to="/cadastro" >
                Não possui cadatro? cadastre-se aqui
            </Link>
        </form >

    );
}

export default Login;
