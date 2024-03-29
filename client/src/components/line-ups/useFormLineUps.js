import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useFormLineUps = () => {
    const BASE_URL = process.env.REACT_APP_URL;

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [homePlayers, setHomePlayers] = useState([]);
    const [awayPlayers, setAwayPlayers] = useState([]);
    const [teamNames, setTeamNames] = useState([]);
    const [finalResult, setFinalResult] = useState("");
    const [formations, setFormations] = useState({});

    useEffect(async () => {
        try {
            const response = await fetch(`${BASE_URL}/results/${id}`);
            return response.json().then(data => {
                setTeamNames([data.result["host.team_name"], data.result["guest.team_name"]]);
                setFormations({ hostFormation: data.result["host.formation"], guestFormation: data.result["guest.formation"] });
                setHomePlayers(data.players.filter(player => player.teamId == data.result["host_id"]));
                setAwayPlayers(data.players.filter(player => player.teamId == data.result["guest_id"]));
                setFinalResult(data.result["home_goals"] + "-" + data.result["away_goals"]);

                setError(null);
                setIsLoading(false);
            });
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }

    }, [BASE_URL]);

    return { homePlayers, awayPlayers, formations, finalResult, error, isLoading, id, teamNames };

}

export default useFormLineUps;