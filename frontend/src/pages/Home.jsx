import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/Highlight/Highlight';
import Footer from '../components/Footer/Footer';

const address = process.env.REACT_APP_ADDRESS;

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </>
    
  );
}

export default Home;