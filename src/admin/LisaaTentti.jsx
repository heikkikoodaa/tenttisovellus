import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './LisaaTentti.css';
import tokenConfig from '../utils/tokenConfig';

const LisaaTentti = () => {
  const navigate = useNavigate();
  const [nimi, setNimi] = useState('');
  const [kuvaus, setKuvaus] = useState('');
  const [pvm, setPvm] = useState('');
  const [maxpisteet, setMaxpisteet] = useState('');
  const [voimassa, setVoimassa] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const lisaaTentti = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        'https://localhost:3001/admin/tentit',
        {
          nimi: nimi,
          kuvaus: kuvaus,
          voimassaolo: voimassa,
          pvm: pvm,
          max_pisteet: maxpisteet,
        },
        tokenConfig()
      );
      setStatusMessage(data.message);
      setTimeout(() => {
        setStatusMessage('');
        navigate('/');
      }, 3000);
    } catch (error) {
      setStatusMessage(`Tapahtui virhe: ${error}`);
      setTimeout(() => {
        setStatusMessage('');
      }, 3000);
    }
  };

  if (statusMessage) {
    return <h1>{statusMessage}</h1>;
  }

  return (
    <div className="lisaatentti-form-container">
      <form className="lisaatentti-form" onSubmit={lisaaTentti}>
        <label htmlFor="nimi">Tentin nimi</label>
        <input
          placeholder="Tentin nimi"
          required
          id="nimi"
          type="text"
          value={nimi}
          onChange={(e) => setNimi(e.target.value)}
        />
        <label htmlFor="kuvaus">Tentin kuvaus</label>
        <textarea
          placeholder="Tentin kuvaus"
          value={kuvaus}
          rows="4"
          id="kuvaus"
          onChange={(e) => setKuvaus(e.target.value)}
        />
        <label htmlFor="pvm">Mihin asti tentti on voimassa?</label>
        <input
          type="date"
          required
          id="pvm"
          value={pvm}
          onChange={(e) => setPvm(e.target.value)}
        />
        <label htmlFor="pisteet">Tentin maksimipisteet</label>
        <input
          type="number"
          required
          id="pisteet"
          value={maxpisteet}
          onChange={(e) => setMaxpisteet(e.target.value)}
        />
        <div className="lisaatentti-checkbox-container">
          <input
            type="checkbox"
            checked={voimassa}
            onChange={(e) => setVoimassa(!voimassa)}
          />
          <span>Onko tentti voimassa?</span>
        </div>
        <button>Lisää uusi tentti</button>
      </form>
    </div>
  );
};

export default LisaaTentti;
