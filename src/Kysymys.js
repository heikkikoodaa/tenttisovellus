import { useContext } from 'react';
import { TenttiContext } from './context/TenttiContext';
import { useDecodeToken } from './hooks/useDecodeToken';
import axios from 'axios';
import Vastaus from './Vastaus';

const tokenConfig = require('./utils/tokenConfig');

const Kysymys = ({ kysymys, vastaukset, index }) => {
  const { dispatch } = useContext(TenttiContext);
  const { isAdmin } = useDecodeToken();

  const vastausvaihtoehdot = vastaukset.map((item) => {
    return (
      <Vastaus
        key={item.id}
        vastaus={item}
        kysymys_id={kysymys.id}
        kys_index={index}
      />
    );
  });

  const poistaKysymys = async (kys_id) => {
    try {
      const { data } = await axios.delete(
        `https://localhost:3001/admin/kysymykset/${kys_id}`,
        tokenConfig()
      );
      if (data.success) {
        dispatch({
          type: 'ADMIN/POISTA_KYSYMYS',
          payload: {
            kys_id: kysymys.id,
          },
        });
      }
    } catch (error) {
      console.error('Virhe kysymyksen poistossa: ', error);
    }
  };

  const lisääVastaus = async () => {
    try {
      const { data } = await axios.post(
        `https://localhost:3001/admin/vastaukset/`,
        { onkoOikein: false, vastaus: '', kysymys_id: kysymys.id },
        tokenConfig()
      );
      if (data.success) {
        dispatch({
          type: 'ADMIN/LISÄÄ_VASTAUSVAIHTOEHTO',
          payload: {
            vastaus_id: data.vastaus_id,
            kys_id: kysymys.id,
          },
        });
      }
    } catch (error) {
      console.error('Virhe vastausvaihtoehdon lisäämisessä');
    }
  };

  if (!isAdmin) {
    return (
      <div className="kysymys">
        <h3>{`Kysymys #${index + 1}: ${kysymys.kysymys}`}</h3>
        {vastausvaihtoehdot}
      </div>
    );
  }

  return (
    <div className="kysymys">
      <h3>{`Kysymys #${index + 1}: ${kysymys.kysymys}`}</h3>
      <input
        className="kysymys-input"
        type="text"
        defaultValue={kysymys.kysymys}
        onChange={async (event) => {
          try {
            await axios.put(
              `https://localhost:3001/admin/kysymykset/${kysymys.id}`,
              {
                kysymys: event.target.value,
              },
              tokenConfig()
            );
            dispatch({
              type: 'KYSYMYS_MUUTETTIIN',
              payload: {
                kysymys: event.target.value,
                kysymysId: kysymys.id,
              },
            });
          } catch (error) {
            console.log(error);
            dispatch({
              type: 'VIRHE',
              payload: {
                virheteksti: 'Hups! Tapahtui virhe. Aika noloa.',
              },
            });
          }
        }}
      />
      {vastausvaihtoehdot}
      <div className="kysymysnapit-container">
        <button onClick={lisääVastaus}>Lisää vastausvaihtoehto</button>
        <button
          onClick={() => poistaKysymys(kysymys.id)}
        >{`Delete question ${kysymys.id}`}</button>
      </div>
    </div>
  );
};

export default Kysymys;
