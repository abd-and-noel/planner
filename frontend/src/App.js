import React, { useEffect, useState } from 'react';
import axios from 'axios';

const address = process.env.REACT_APP_ADDRESS;

function App() {
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
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
