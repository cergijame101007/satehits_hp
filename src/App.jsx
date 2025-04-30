import Header from './components/Header';
import Hero from './components/Hero';
import Concept from './components/Concept';
import Menu from './components/Menu';
import Takeout from './components/Takeout';
import About from './components/About'
import Form from './components/Form';
import Footer from './components/Footer';

function App() {
  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu").querySelector("ul");

    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  });
  return (
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
  )
}

export default App
