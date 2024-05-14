import React, { useState, useEffect } from 'react';
import "./frases.scss";
import imagem1 from "../../assets/imagens/animal-1.jpg";
import imagem2 from "../../assets/imagens/animal-2.jpg";
import imagem3 from "../../assets/imagens/animal-3.jpg";
import imagem4 from "../../assets/imagens/animal-4.jpg";
import imagem5 from "../../assets/imagens/animal-5.jpg";
import imagem6 from "../../assets/imagens/animal-6.jpg";
import imagem7 from "../../assets/imagens/animal-7.jpg";


const Frases = () => {
    const frases = [
        'Animais de rua frequentemente sofrem de doenças, muitas das quais não são tratadas.',
        'A COVID-19 aumentou o abandono devido à crise financeira.',
        'Muitos animais abandonados passam fome e têm dificuldade para encontrar alimento nas ruas.',
        'A expectativa de vida de um animal de rua é significativamente menor do que a de um animal doméstico.',
        'Animais abandonados competem por recursos limitados, como comida e água.',
        'Grandes populações de animais de rua podem afetar a fauna local, caçando pequenos animais e aves.',
        'A falta de controle populacional leva a um aumento contínuo de animais nas ruas.'
    ];

    const imagens = [
        imagem1,
        imagem2,
        imagem3,
        imagem4,
        imagem5,
        imagem6,
        imagem7,
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % frases.length);
        }, 5000); // Muda a cada 3 segundos

        return () => clearInterval(intervalId);
    }, [frases.length]);

    return (
        <div className='frases_container'>
            <div className='img_container'>
                <img src={imagens[index]} alt={`Imagem ${index + 1}`} style={{ width: '300px', height: '200px' }} />
            </div>

            <h4>{frases[index]}</h4>
        </div>
    );
};

export default Frases;
