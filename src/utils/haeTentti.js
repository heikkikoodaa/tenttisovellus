import axios from 'axios';
import tokenConfig from './tokenConfig';

async function haeTentti(tentti_id) {
  try {
    const { data } = await axios.get(
      `https://localhost:3001/tentit/${tentti_id}`,
      tokenConfig()
    );
    return data;
  } catch (error) {
    console.log('Virhe tentin haussa', error);
  }
}

export default haeTentti;
