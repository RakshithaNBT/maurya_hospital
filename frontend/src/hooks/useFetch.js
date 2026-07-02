import { useState, useEffect, useCallback } from 'react';
import API from '../services/api';

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.get(endpoint);
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error(`Error fetching from ${endpoint}:`, err);
      setError(err.response?.data?.message || err.message || 'Failed to load resources');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Expose refetch trigger and manual setData updater
  return { data, loading, error, refetch: fetchData, setData };
};

export default useFetch;
