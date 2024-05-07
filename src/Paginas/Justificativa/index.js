import React, { useState, useEffect } from 'react'

import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import 'firebase/compat/auth';
import Landing from "../../assets/imagens/justificativa.png"
import img1 from "../../assets/imagens/images.jpeg"
import img2 from "../../assets/imagens/images2.jpg"
import img3 from "../../assets/imagens/img3.PNG"
import img4 from "../../assets/imagens/img2.PNG"
import img5 from "../../assets/imagens/img5.PNG"
import Footer from '../../Componentes/Footer/';
import Header from "../../Componentes/Header/header";
import "./justificativa.scss"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
            <section className="justificativa-container">
                <div className='justificativas'>
                    <div className="text-container">
                        <h2>Justificativa HELPETS</h2>
                        <p>
                            A Helpets foi criada para suprir a necessidade de uma plataforma exclusiva para adoção de pets. Diante da ausência de um espaço dedicado, muitos adotantes e animais em busca de lares amorosos acabam dispersos em outras redes sociais. Com a Helpets, proporcionamos um ambiente único, simplificando e agilizando a conexão entre quem busca e quem oferece um lar, promovendo assim o bem-estar dos animais e fortalecendo essa importante comunidade de amor pelos pets.
                        </p>
                    </div>
                    <div className="image-container">
                        <img src={Landing} alt="Imagem da Helpets" />
                    </div>

                </div>

            </section >


            <section className='images'>
                <h2>Veja Exemplos</h2>
                <p>A maioria das pessoas acaba compartilhando informações sobre adoção de pets em redes sociais genéricas, onde a informação se perde. A Helpets resolve isso oferecendo um espaço exclusivo para adoção de pets, simplificando a busca e promovendo conexões diretas entre adotantes e animais.</p>

                <Slider dots={true}
                    // Mostra as bolinhas de navegação
                    infinite={true} // Permite rolar infinitamente o carrossel
                    speed={500} // Velocidade da transição em milissegundos
                    slidesToShow={3} // Número de slides visíveis ao mesmo tempo
                    slidesToScroll={1} // Número de slides a rolar por vez
                    autoplay={true} // Ativa o autoplay do carrossel
                    autoplaySpeed={3000} // Velocidade do autoplay em milissegundos
                    responsive={[
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                infinite: true,
                                dots: true,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                initialSlide: 0,
                            },
                        },
                    ]}
                >
                    <div className='containerIImg'>
                        <img src={img1} alt="Imagem 1" />
                    </div>
                    <div className='containerIImg'>
                        <img src={img2} alt="Imagem 2" />
                    </div>
                    <div className='containerIImg'>
                        <img src={img3} alt="Imagem 2" />
                    </div>
                    <div className='containerIImg'>
                        <img src={img4} alt="Imagem 2" />
                    </div>
                    <div className='containerIImg'>
                        <img src={img5} alt="Imagem 2" />
                    </div>
                </Slider>
            </section>
            <Footer></Footer>
        </>



    )
}

export default Justificativa

