import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useFormMatchesStatistics = () => {
  const BASE_URL = process.env.REACT_APP_URL;

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [matchesStatistics, setMatchesStatistics] = useState([]);
  const [teamNames, setTeamNames] = useState([]);
  const [finalResult, setFinalResult] = useState("");
  const [error, setError] = useState(null);
  
  useEffect(() => {
    getMatchesStatistics();
    getResultValues();  
  }, [BASE_URL]);
  
  const getMatchesStatistics = async () => {
      try {
        const response = await fetch(`${BASE_URL}/matches-statistics/${id}`);
        return response.json().then(data => {
          setMatchesStatistics(data);
          setError(null);
          setIsLoading(false);
        })
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    const getResultValues = async () => {
      try {
        const response = await fetch(`${BASE_URL}/results/${id}`);
        return response.json().then(data => {
          setTeamNames([data.result["host.team_name"], data.result["guest.team_name"]]);
          setFinalResult(data.result["home_goals"] + "-" + data.result["away_goals"]);
        })
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    
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
  
  return { matchesStatistics, finalResult, error, deleteMatchStatistic, isLoading, id, teamNames };
}

export default useFormMatchesStatistics;