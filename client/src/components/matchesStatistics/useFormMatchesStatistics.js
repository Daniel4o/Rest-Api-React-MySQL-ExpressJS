import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useFormMatchesStatistics = () => {
  const BASE_URL = process.env.REACT_APP_URL;

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [matchesStatistics, setMatchesStatistics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      const response = await fetch(`${BASE_URL}/matches-statistics/${id}`);
      return response.json()
        .then(data => {
          setMatchesStatistics(data);
          setError(null);
          setIsLoading(false);
        })
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [BASE_URL]);

  const deleteMatchStatistic = async (id) => {
    try {
      await fetch(`${BASE_URL}/matches-statistics/${id}`, {
        method: "DELETE",
      }).then(response => {
        setMatchesStatistics(matchesStatistics.filter(matchStatistics => matchStatistics.id !== id))
        return response.json();
      })
    } catch (error) {
      console.log(error);
    }
  }

  return { matchesStatistics, error, deleteMatchStatistic, isLoading };
}

export default useFormMatchesStatistics;