import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Concept from './components/Concept';
import Menu from './components/Menu';
import Takeout from './components/Takeout';
import About from './components/About'
import Form from './components/Form';
import Footer from './components/Footer';
import Thanks from './Thanks';
import Partner from './Partner';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <>
            <Header />
            <main>
              <Hero />
              <Concept />
              <Menu />
              <Takeout />
              <About />
              <Form />
            </main>
            <Footer />
          </>
        } />
        <Route path='/thanks' element={<Thanks />} />
        <Route path='/partner' element={<Partner />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
