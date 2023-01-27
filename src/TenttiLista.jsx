import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { TenttiContext } from './context/TenttiContext';

import Button from '@mui/material/Button';

const TenttiLista = () => {
  const { dispatch, tentti } = useContext(TenttiContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const haeTentit = async () => {
      const { data } = await axios.get('https://localhost:3001/tentit');
      if (data.success) {
        dispatch({
          type: 'HAE_KAIKKI_TENTIT',
          payload: {
            tentit: data.results,
          },
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        return <h1>Tenttien haussa virhe!</h1>;
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
      <h1>Valittavissa olevat tentit:</h1>
      <div className="tenttinapit-container">
        {tentti.tenttilista?.map((item) => (
          <Link key={item.id} to={`/tentit/${item.id}`}>
            <Button>{item.nimi}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TenttiLista;
