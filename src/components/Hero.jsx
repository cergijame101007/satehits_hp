import './Hero.css';
import { Helmet } from 'react-helmet-async';

const Hero = () => {
    return (
        <>
            <Helmet>
                <meta name='description' content='『さて羊に戻るとしよう』は、和紅茶とお野菜と富山湾の幸をメインに小麦、乳製品、卵、添加物などは使わないお昼ご飯を提供。高岡で間借り営業中です。' />

                <meta property='og:title' content='さて羊に戻るとしよう | 和紅茶とお野菜と富山湾の幸' />
                <meta property='og:description' content='素材と向き合う体にやさしいお昼ご飯を提供。『さて羊に戻るとしよう』のご紹介' />
                <meta property='og:image' content='https://satehits.onrender.com/og-top-view-high.jpg' />
                <meta property='og:url' content='https://satehits.onrender.com/' />
                <meta property='og:type' content='website' />

                <meta name='robots' content='index, follow' />
            </Helmet>
            <section id="home" className="hero">
                <div className="heroText">
                    <h1>さて羊に戻るとしよう</h1>
                    <h2>ー和紅茶とお野菜と富山湾の幸ー</h2>
                    <p>
                        小麦、乳製品、卵、添加物などはつかわないお昼ご飯を提供させていただきます。
                        食後には豆花と和紅茶を。
                    </p>
                </div>
            </section>
        </>
    );
};

export default Hero
