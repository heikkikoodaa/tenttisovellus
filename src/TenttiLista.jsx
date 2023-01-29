import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { TenttiContext } from './context/TenttiContext';

import Button from '@mui/material/Button';

const TenttiLista = () => {
  const { tentti, dispatch } = useContext(TenttiContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const haeTentit = async () => {
      try {
        const { data } = await axios.get('https://localhost:3001/tentit');
        if (data.success) {
          dispatch({
            type: 'HAE_KAIKKI_TENTIT',
            payload: {
              tentit: data.results,
            },
          });
        }
      } catch (error) {
        console.error(error.message);
        <h2>Tenttien haussa virhe!</h2>;
      } finally {
        setIsLoading(false);
      }
    };
    haeTentit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    <h2>Haetaan tenttejä tietokannasta...</h2>;
  }

  return (
    <div>
      {console.log(tentti)}
      <h1>Valittavissa olevat tentit:</h1>
      <div className="tenttinapit-container">
        {tentti && tentti.tenttilista ? (
          tentti.tenttilista.map((item) => (
            <Link key={item.id} to={`/tentit/${item.id}`}>
              <Button>{item.nimi}</Button>
            </Link>
          ))
        ) : (
          <h2>Tenttejä ei löytynyt</h2>
        )}
      </div>
    </div>
  );
};

export default TenttiLista;
