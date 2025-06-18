import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';

const address = process.env.REACT_APP_ADDRESS;

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`http://${address}:8000/api/hello/`);
        setMessage(response.data.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessage();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      {message}
    </>
    
  );
}

export default Home;