import { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [nimi, setNimi] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  console.count('RegisterForm.jsx rendered: ');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (!email || !pwd || !nimi || !pwd2) {
        throw new Error('Täytä kaikki kentät!');
      } else if (pwd !== pwd2) {
        throw new Error(
          'Salasanat eivät täsmää! kirjoita salasanat uudestaan!'
        );
      }

      const { data } = await axios.post('https://localhost:3001/kayttajat', {
        nimi: nimi,
        email: email,
        password: pwd,
      });

      setNimi('');
      setEmail('');
      setPwd('');
      setPwd2('');
      setStatusMessage(data.message);
      setTimeout(() => {
        setStatusMessage('');
      }, 2000);
    } catch (error) {
      console.error('Login.js - Rekisteröintivirhe!', error);
    }
  };

  if (statusMessage) {
    return <h1>{statusMessage}</h1>;
  }

  return (
    <form className="signup-form" onSubmit={handleRegister}>
      <h2>Rekisteröidy</h2>
      <label htmlFor="nimi">Nimi</label>
      <input
        required
        onChange={(e) => setNimi(e.target.value)}
        type="text"
        name="nimi"
        value={nimi}
      />
      <label htmlFor="email">Sähköpostiosoite</label>
      <input
        required
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        value={email}
      />
      <label htmlFor="password">Salasana:</label>
      <input
        required
        onChange={(e) => setPwd(e.target.value)}
        type="password"
        name="password"
        value={pwd}
      />
      <label htmlFor="password">Salasana uudelleen:</label>
      <input
        required
        onChange={(e) => setPwd2(e.target.value)}
        type="password"
        name="password2"
        value={pwd2}
      />
      <button>Rekisteröidy</button>
    </form>
  );
};

export default RegisterForm;
