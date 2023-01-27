import { useEffect, useState } from 'react';
import { useDecodeToken } from './hooks/useDecodeToken';
import axios from 'axios';

import tokenConfig from './utils/tokenConfig';

const KeskeneraisetTentit = () => {
  const { userId } = useDecodeToken();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const haeData = async () => {
      try {
        const { data } = await axios.get(
          `https://localhost:3001/tentit/kayttaja/${userId}`,
          tokenConfig()
        );
        if (data.success) {
          setData(data.tentit);
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    haeData();
  }, [userId]);

  if (isLoading) {
    return <h2>Ladataan keskeneräisiä tenttejä...</h2>;
  }

  if (errorMessage) {
    return <h2>{errorMessage}</h2>;
  }

  if (data.length === 0) {
    return <h1>Ei keskeneräisiä tenttejä 🥳🎉</h1>;
  }

  // Hae myös käyttäjän tämän hetkiset vastaukset tänne?

  return (
    <div>
      <h1>{`Käyttäjän ${userId} keskeneräiset tentit:`}</h1>
      {data.map((item) => {
        return (
          <div className="tentti-card-container">
            <h2>{item.nimi}</h2>
            <p>{item.kuvaus}</p>
          </div>
        );
      })}
    </div>
  );
};

export default KeskeneraisetTentit;
