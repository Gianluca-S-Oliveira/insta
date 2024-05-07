import React from 'react';
import FIAPLogo from '../../assets/imagens/fiap-logo.jpg'; // Importe o logo da FIAP
import QRCode from '../../assets/imagens/qrcode-pix.png'; // Importe o logo da FIAP
import "./footer.scss"
const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="qr-code">
                    <img src={QRCode} alt="Logo da FIAP" />

                </div>
                <div className="footer-text">
                    <p>Direitos Autorais © 2024. Todos os direitos reservados.</p>
                    <img src={FIAPLogo} alt="Logo da FIAP" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;