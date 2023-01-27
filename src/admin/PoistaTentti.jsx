import { useState, useEffect, useContext } from 'react';
import { useAxios } from '../hooks/useAxios';

import tokenConfig from '../utils/tokenConfig';
import { TenttiContext } from '../context/TenttiContext';

import './poistatentti.css';
import axios from 'axios';

const PoistaTentti = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const { dispatch, tentti } = useContext(TenttiContext);
  const { data, loading, error } = useAxios({
    method: 'GET',
    url: `/admin/tentit`,
    ...tokenConfig(),
  });

  useEffect(() => {
    dispatch({
      type: 'ADMIN/TENTIT_HAETTU',
      payload: data?.results,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (statusMessage) {
    return <h1>{statusMessage}</h1>;
  }

  if (loading) {
    return <h1>Tenttejä haetaan tietokannasta...</h1>;
  }

  if (error) {
    return <h1>{`Hups! Jotakin meni pieleen: ${error}`}</h1>;
  }

  const handleDelete = async (e, tenttiId) => {
    try {
      if (!tenttiId) {
        throw new Error('tenttiId on tyhjä!');
      }

      await axios.delete(
        `https://localhost:3001/admin/tentit/${tenttiId}`,
        tokenConfig()
      );
      dispatch({
        type: 'ADMIN/POISTA_TENTTI',
        payload: tenttiId,
      });
    } catch (error) {
      setStatusMessage(error);
      setTimeout(() => {
        setStatusMessage('');
      }, 2000);
    }
  };

  return (
    <div className="admin-tentti-card-container">
      {tentti.tenttilista?.map((item) => {
        return (
          <div
            onClick={(e) => handleDelete(e, item.id)}
            className="admin-tentti-card"
            key={item.id}
          >
            <h2>{`Tentti - id: ${item.id}`}</h2>
            <div>
              <h3>{item.nimi}</h3>
              <p>{item.kuvaus}</p>
              <p>{`Voimassa ${item.pvm} asti`}</p>
              <p>{`Onko tentti näkyvillä opiskelijoille? ${
                item.voimassaolo ? 'On' : 'Ei'
              }`}</p>
              <p>{`Tentin maksimi pisteet: ${item.max_pisteet}`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PoistaTentti;
