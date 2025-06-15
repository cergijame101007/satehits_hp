import Header from './components/Header';
import Footer from './components/Footer';
import './Partner.css'
import './index.css'

const Partner = () => {
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