import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import './Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isPartnerPage = location.pathname === '/partner';

    useEffect(() => {
        const hamburger = document.getElementById("hamburger");
        const navMenu = document.getElementById("nav-menu").querySelector("ul");

        if (hamburger && navMenu) {
            hamburger.addEventListener("click", () => {
                navMenu.classList.toggle("show");
            });
        }

        return () => {
            if (hamburger && navMenu) {
                hamburger.addEventListener("click", () => {
                    navMenu.classList.toggle("show");
                });
            }
        }
    }, [])


    return (
        <header>
            <div className="logo">
                <Link to="/">さて羊に戻るとしよう</Link>
            </div>
            <nav id="nav-menu">
                <ul className={menuOpen ? 'show' : ''}>
                    {!isPartnerPage && (
                        <>
                            <li><a href="#concept">コンセプト</a></li>
                            <li><a href="#menu">メニュー</a></li>
                            <li><a href="#takeout">テイクアウト</a></li>
                            <li><a href="#about">店舗情報</a></li>
                            <li><a href="#contact">お問い合わせ</a></li>
                        </>
                    )}

                    <li>
                        <Link to={isPartnerPage ? '/' : '/partner'} className='partner-link'>
                            {isPartnerPage ? 'トップ' : 'お取引先'}
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="hamburger" id="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
    );
}

export default Header
