import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import './Thanks.css'

const Thanks = () => {
    return (
        <>
            <Helmet>
                <title>ご予約ありがとうございました | さて羊に戻るとしよう</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <section className='thanks-wrapper'>
                <h2>送信ありがとうございました！</h2>
                <p>飲食店オーナーがご予約内容を確認し、折り返しご入力いただいたメールアドレスへ折り返しご連絡いたします。</p>
                <p>ご入力いただいたメールアドレス宛に確認メールをお送りしていますが、迷惑メールフォルダに振り分けられてしまう場合があります。</p>
                <p>お手数ですが、メールフォルダにて確認できない場合は迷惑メールフォルダもあわせてご確認ください。</p>
                <Link to='/' className='back-link'>トップへ戻る</Link>
            </section>

        </>
    );
};

export default Thanks;