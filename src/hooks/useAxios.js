import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:3001';

export const useAxios = (axiosParams) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const haeData = async (params) => {
    try {
      const { data } = await axios.request(params);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    haeData(axiosParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, error };
};
