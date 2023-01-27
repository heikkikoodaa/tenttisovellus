import { useState, useEffect, useContext } from 'react';
import { useDecodeToken } from './hooks/useDecodeToken';
import { useParams } from 'react-router-dom';
import './Tentti.css';

import haeTentti from './utils/haeTentti';

import Kysymys from './Kysymys';
import Button from '@mui/material/Button';
import UusiKysymysForm from './admin/UusiKysymysForm';
import { TenttiContext } from './context/TenttiContext';
import axios from 'axios';
import tokenConfig from './utils/tokenConfig';

/* Komponentti yhden tentin näyttämistä varten */

const Tentti = () => {
  const { id: tenttiId } = useParams();
  const [lomakeEsilla, setLomakeEsilla] = useState(false);
  const [tenttiAloitettu, setTenttiAloitettu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch, tentti } = useContext(TenttiContext);
  const { isAdmin, userId } = useDecodeToken();

  console.count('Tentti.js on ladannut: ');

  useEffect(() => {
    const haeData = async () => {
      try {
        const data = await haeTentti(tenttiId);
        if (data.success) {
          dispatch({
            type: 'TENTTI_HAETTU',
            payload: {
              valittuTentti: data,
            },
          });
        }
      } catch (error) {
        console.error('Tentin haussa ongelmia: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    haeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenttiId]);

  // const { data, loading, error } = useAxios({
  //   method: 'GET',
  //   url: `/tentit/${tenttiId}`,
  //   ...tokenConfig(),
  // });

  // useEffect(() => {
  //   if (!dataHaettu) {
  //     setDataHaettu(true);
  //     dispatch({
  //       type: 'TENTTI_HAETTU',
  //       payload: {
  //         valittuTentti: { ...data.tentti },
  //       },
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (isLoading) {
    return <h2>Haetaan tenttiä tietokannasta...</h2>;
  }

  const muutaLomakkeenTila = () => {
    setLomakeEsilla(!lomakeEsilla);
  };

  const palautaTentti = (e) => {
    console.log(e);
  };

  const aloitaTentti = async () => {
    const uusiSuoritus = {
      kayttaja_id: userId,
    };

    try {
      const { data } = await axios.post(
        `https://localhost:3001/tentit/${tenttiId}/suoritus`,
        uusiSuoritus,
        tokenConfig()
      );
      if (data.success) {
        setTenttiAloitettu(true);
      }
    } catch (error) {
      console.error('Virhe suorituksen merkinnässä: ', error);
    }
  };

  const kysymykset = tentti.haettuTentti.kysymykset?.map((item, index) => {
    return (
      <Kysymys
        key={item.id}
        index={index}
        id={item.id}
        kysymys={item}
        vastaukset={item.vastausvaihtoehdot}
      />
    );
  });

  if (!isAdmin) {
    return (
      <div className="tentti">
        <h1>{tentti.haettuTentti.tentti?.nimi}</h1>
        {kysymykset}
        <button onClick={palautaTentti} className="tentin-palautusnappi">
          Palauta tentti
        </button>
      </div>
    );
  }

  return (
    <div className="tentti">
      <h1>{tentti.haettuTentti.tentti?.nimi}</h1>
      {kysymykset}
      <Button onClick={muutaLomakkeenTila} color="secondary">
        {lomakeEsilla ? 'Piilota lomake' : 'Uusi kysymys'}
      </Button>
      {lomakeEsilla && (
        <UusiKysymysForm
          tenttiId={tentti.haettuTentti?.tentti.id}
          muutaLomakkeenTila={muutaLomakkeenTila}
        />
      )}
    </div>
  );
};

export default Tentti;
