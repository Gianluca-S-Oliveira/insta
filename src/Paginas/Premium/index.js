import { BsFillCartPlusFill } from "react-icons/bs";
import { AiFillGift } from "react-icons/ai";
import { BsFillChatLeftFill } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import 'firebase/compat/auth';
import Posts from '../Posts/PostsList/Posts';
import PremiumImg from "../../assets/imagens/premium.png"
import Card from '../../Componentes/Card/';
import Footer from '../../Componentes/Footer/';
import Header from "../../Componentes/Header/header";
import BotaoCustomizado from "../../Componentes/Botao/botao";
import { AiOutlineMail } from "react-icons/ai";
import "./premium.scss"
function Premium() {

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
        <>
            <div className="reasons">

                {user && user.displayName ? (
                    <>
                        <Header username={user.displayName} />
                    </>
                ) : (
                    <div className='unauth'>
                    </div>
                )}

                <section className="justificativa-container">
                    <div className='justificativas'>
                        <div className="premium_text">
                            <h2 className="h2">Seja Helpets Premium!</h2>
                            <p>
                                Leve sua experiência na Helpets para outro nível com nossa assinatura premium. Desfrute de benefícios exclusivos, destaque sua participação na comunidade e aproveite descontos especiais em produtos e serviços relacionados a animais de estimação. Assine hoje mesmo e faça a diferença na vida dos animais que precisam de ajuda!
                            </p>
                            <div style={{ width: '80%' }}>
                                <a href='/pagamento' >
                                    <BotaoCustomizado type="submit" to='/cadastro'>
                                        Assinar Agora

                                    </BotaoCustomizado>
                                </a>
                                <br />
                                <br />

                                <Link to="/cadastro" style={{ textDecoration: 'none', color: 'var(--laranja--escuro)', fontSize: '1.4rem', marginTop: '10px' }} >
                                    Não possui cadastro? <span className="span"> cadastre-se aqui</span>
                                </Link>
                            </div>

                        </div>
                        <div className="image-container">
                            <img src={PremiumImg} alt="Imagem da Helpets" />
                        </div>

                    </div>

                </section >
                <section className="beneficios">
                    <h3>Benefícios da Assinatura Premium</h3>
                    <div className="cards-container">
                        <Card
                            icon={<BsFillChatLeftFill />}
                            title="CHAT PRIVADO "
                            text="Converse facilmente na plataforma com nosso chat interno, simplificando suas interações e permitindo uma comunicação direta e eficiente com outros usuários."
                        />
                        <Card
                            icon={<FaCrown />}
                            title="SELO E VISIBILIDADE"
                            text="Destaque sua presença na comunidade Helpets com o Selo de Visibilidade. Este selo exclusivo aumenta sua visibilidade na plataforma!"
                        />    <Card
                            icon={<AiFillGift />}
                            title="PRESENTES DA PLATAFORMA"
                            text="Assinantes premium participam de sorteios mensais exclusivos. Não perca a chance de ganhar prêmios especiais enquanto ajuda os animais de estimação.!"
                        />
                        <Card
                            icon={<BsFillCartPlusFill />}
                            title="DESCONTOS EXCLUSIVOS"
                            text="Oferece  descontos exclusivos em consultas veterinárias e produtos através de parcerias com pet shops. Cuide do seu animal de estimação com economia e qualidade. "
                        />

                    </div>
                </section>



            </div>
            <Footer></Footer>
        </>
    )
}

export default Premium

