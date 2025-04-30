import { useState } from 'react';
import './Header.css';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header>
            <div className="logo">
                <a href="#home">さて羊に戻るとしよう</a>
            </div>
            <nav id="nav-menu">
                <ul className={menuOpen ? 'show' : ''}>
                    <li><a href="#concept">コンセプト</a></li>
                    <li><a href="#menu">メニュー</a></li>
                    <li><a href="#takeout">テイクアウト</a></li>
                    <li><a href="#about">店舗情報</a></li>
                    <li><a href="#contact">お問い合わせ</a></li>
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
