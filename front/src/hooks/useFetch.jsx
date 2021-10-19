//useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ConsoleView } from 'react-device-detect';

function useFetch(url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
      setLoading('loading...')
      setData(null);
      setError(null);
      const source = axios.CancelToken.source();
      axios.get(url, { cancelToken: source.token })
      .then(res => {
          setLoading(false);
          res.data && setData(res.data);
      })
      .catch(err => {
          setLoading(false)
          setError('An error occurred. Awkward..')
      })
      return () => {
          source.cancel();
      }
  }, [url])

  return { data, loading, error }
}

export default useFetch;