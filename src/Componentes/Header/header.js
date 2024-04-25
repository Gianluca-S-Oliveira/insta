import { FaCrown } from "react-icons/fa";
import { HiOutlineViewList } from "react-icons/hi";
import { CgAddR } from "react-icons/cg";
import React, { useState } from 'react';
import "./header.scss";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import logo from "../../assets/imagens/logo.png"


function Header({ username }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="logo"> <img
                className="logo"
                src={logo}
                width={60}
                alt=""

            /></div>
            <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <nav className={`menu ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li><a href="/home"><div><CgAddR /></div>Postagens</a></li>
                    <li><a href="/justificativa"><div><HiOutlineViewList /></div> Justificativas</a></li>
                    <li><a href="/premium"><div><FaCrown /></div>Premium</a></li>
                </ul>
            </nav>
            <div>{username}
                {username ? (

                    <Link to="/" onClick={() => auth.signOut()}>sair</Link>
                ) : (
                    <div>

                    </div>
                )}</div>

        </header>
    );
}

export default Header;
