import Header from './components/Header';
import Footer from './components/Footer';
import './Partner.css'
import './index.css'
import { usePageMeta } from './hooks/usePageMeta';

const metaDefinitions = [
    { attr: 'name',     key: 'description',    content: '飲食店『さて羊に戻るとしよう』がお世話になっているお取引先の一覧をご紹介します。' },
    { attr: 'property', key: 'og:title',       content: 'お取引先一覧 | さて羊に戻るとしよう' },
    { attr: 'property', key: 'og:description', content: '当店のお取引先一覧。仕入れ・協力企業などをご紹介します。' },
    { attr: 'property', key: 'og:url',         content: 'https://satehits.onrender.com/partner' },
    { attr: 'property', key: 'og:type',        content: 'website' },
    { attr: 'name',     key: 'robots',         content: 'index, follow' }
];

const Partner = () => {
    usePageMeta('お取引先一覧 | さて羊に戻るとしよう', metaDefinitions);

    return (
        <>
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