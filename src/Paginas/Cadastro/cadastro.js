import { AiOutlineUser } from "react-icons/ai";
import { FiSmartphone } from "react-icons/fi";
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BotaoCustomizado from "../../Componentes/Botao/botao";
import { useNavigate } from 'react-router-dom';
import InputDefault from "../../Componentes/Inputs/input";
import { auth } from "../../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import "./cadastro.scss"
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

const Cadastro = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    const signUp = (event) => {
        event.preventDefault();

        if (!username || !email || !password || !whatsapp) {
            toast.error("Preencha todos os campos por favor!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                    phoneNumber: whatsapp,
                });
            })
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message)
                if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                    toast.error("A senha deve possuir ao menos 6 caracteres!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error("Erro ao cadastrar! Por favor revise so campos preenchidos!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }

            });
    };

    return (
        <div className="cadastro_container">
            <div className="background-div "></div>
            <form className="cadastro_fields" onSubmit={signUp}>
                <h1 className="h1_cadastro">CRIE SUA <span>CONTA</span> </h1>
                <br />
                <InputDefault
                    icon={<AiOutlineUser />}
                    placeholder="Digite seu nome..."
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <InputDefault
                    icon={<AiOutlineMail />}
                    placeholder="Digite seu email..."
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <InputDefault
                    icon={<FiSmartphone />}
                    placeholder="Digite seu numero..."
                    type="number"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                />
                <br />
                <InputDefault
                    icon={<RiLockPasswordFill />}
                    placeholder="Digite sua senha..."
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <BotaoCustomizado type="submit">
                    CADASTRAR
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
            </form>
        </div>
    );
}

export default Cadastro;
