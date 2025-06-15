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
import Partner from './Partner'


const App = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu").querySelector("ul");

    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  });
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

  )
}

export default App
