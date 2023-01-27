import { Button } from '@mui/material';
import { useRef, useState, useContext } from 'react';
import VaihtoehtoKentta from '../VaihtoehtoKentta';
import axios from 'axios';
import { TenttiContext } from '../context/TenttiContext';
import tokenConfig from '../utils/tokenConfig';

const UusiKysymysForm = ({ muutaLomakkeenTila }) => {
  const kysymysRef = useRef();
  const pisteRef = useRef();
  const [vaihtoehdot, setVaihtoehdot] = useState([]);
  const { dispatch, tentti } = useContext(TenttiContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let kysymys_id = '';

    if (!kysymysRef.current.value || vaihtoehdot.length === 0) {
      alert(
        'Kysymys ei saa olla tyhjä ja vastausvaihtoehtoja pitää olla enemmän kuin nolla!'
      );
      return;
    }

    try {
      const { data: kysymysData } = await axios.post(
        'https://localhost:3001/admin/kysymykset',
        {
          kysymys: kysymysRef.current.value,
          pisteet: pisteRef.current.value,
          tentti_id: tentti.haettuTentti.tentti.id,
        },
        tokenConfig()
      );
      kysymys_id = kysymysData.kysymys_id;
    } catch (error) {
      console.error('Virhe lähettäessä kysymystä DB:hen', error);
    } finally {
      vaihtoehdot.forEach(async (item) => {
        try {
          await axios.post(
            'https://localhost:3001/admin/vastaukset',
            {
              onkoOikein: item.oikein,
              vastaus: item.teksti,
              kysymys_id: kysymys_id,
            },
            tokenConfig()
          );
        } catch (error) {
          dispatch({
            type: 'VIRHE',
            payload: {
              message: 'Virhe vastauksen lähettämisessä tietokantaan!',
            },
          });
        }
      });
      dispatch({
        type: 'KYSYMYS_LISÄTTIIN',
        payload: {
          kysymys: kysymysRef.current.value,
          vaihtoehdot: vaihtoehdot,
          kysymys_id: kysymys_id,
        },
      });
    }

    // dispatch({
    //   type: 'KYSYMYS_LISÄTTIIN',
    //   payload: {
    //     kysymys: kysymys,
    //     vastausvaihtoehdot: vaihtoehdot,
    //     tenttiId: tenttiId,
    //     pisteet: pisteet,
    //   },
    // });
    setVaihtoehdot([]);
    (() => muutaLomakkeenTila())();
  };

  const uusiVaihtoehtoKentta = (e) => {
    const uusiKentta = {
      id: vaihtoehdot.length + 1,
      teksti: '',
      oikein: false,
      kysymys_id: '',
    };

    setVaihtoehdot([...vaihtoehdot, uusiKentta]);
  };

  const poistaVaihtoehto = (e, id) => {
    setVaihtoehdot(vaihtoehdot.filter((item) => item.id !== id));
  };

  const muutaVaihtoehtoKenttaa = (e, id) => {
    const { value, name, type } = e.target;
    const vaihtoehdotKopio = JSON.parse(JSON.stringify(vaihtoehdot));

    if (type === 'checkbox') {
      const muuttuneetArvot = vaihtoehdotKopio.map((item) => {
        if (item.id === id) {
          return { ...item, [name]: !item.oikein };
        }
        return { ...item };
      });
      setVaihtoehdot(muuttuneetArvot);
    } else {
      const muuttuneetArvot = vaihtoehdotKopio.map((item) => {
        if (item.id === id) {
          return { ...item, [name]: value };
        }
        return { ...item };
      });
      setVaihtoehdot(muuttuneetArvot);
    }
  };

  return (
    <form className="uusi-kysymys-form" onSubmit={handleSubmit}>
      <input
        ref={kysymysRef}
        className="uusi-kysymys-input"
        type="text"
        name="kysymys"
        placeholder="Kysymys tähän"
      />
      <input
        ref={pisteRef}
        type="number"
        name="pisteet"
        placeholder="Kysymyksen pistemäärä"
      />
      {vaihtoehdot.map((item, index) => {
        return (
          <VaihtoehtoKentta
            key={index}
            index={index}
            id={item.id}
            muutaVaihtoehtoKenttaa={muutaVaihtoehtoKenttaa}
            vastaus={item.vastaus}
            onkoOikea={item.onkoOikea}
            poistaVaihtoehto={poistaVaihtoehto}
          />
        );
      })}
      <span className="lisaa-kysymys-nappi" onClick={uusiVaihtoehtoKentta}>
        Lisää vastausvaihtoehto
      </span>
      <Button type="submit">Lisää kysymys nykyiseen tenttiin</Button>
    </form>
  );
};

export default UusiKysymysForm;
