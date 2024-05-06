import React from 'react';
import './card.scss'; // Arquivo de estilos CSS para o Card

const Card = ({ icon, title, text }) => {
    return (
        <div className="card">
            <div className="card-icon">
                {icon}
            </div>
            <h2 className="card-title">{title}</h2>
            <p className="card-text">{text}</p>
        </div>
    );
}

export default Card;
