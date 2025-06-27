import Header from './components/Header';
import Footer from './components/Footer';
import { Helmet } from 'react-helmet-async';
import './Partner.css'
import './index.css'

const Partner = () => {
    return (
        <>
            <Helmet>
                <title>お取引先 | さて羊に戻るとしよう</title>
                <meta name='description' content='飲食店『さて羊に戻るとしよう』がお世話になっているお取引先の一覧をご紹介します。' />

                <meta property='og:title' content='お取引先一覧 | さて羊に戻るとしよう' />
                <meta property='og:description' content='当店のお取引先一覧。仕入れ・協力企業などをご紹介します。' />
                <meta property='og:url' content='https://satehits.onrender.com/partner' />
                <meta property='og:type' content='website' />

                <meta name='robots' content='index, follow' />
            </Helmet>
            <Header />
            <main className='partner-wrapper'>
                <section>
                    <p>ここにお取引先に関する情報を掲載します。</p>
                    <p>掲載する情報が決まり次第、更新いたします。</p>
                </section>
            </main>
            <Footer />
        </>

    )
}

export default Partner