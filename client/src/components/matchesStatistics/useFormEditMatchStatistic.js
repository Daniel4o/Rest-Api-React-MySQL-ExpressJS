import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';

const useFormAddMatchStatistic = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [result, setResult] = useState([]);
    const [matchStatistic, setMatchStatistic] = useState({
        host: "",
        host_id: null,
        guest: "",
        guest_id: null
    });
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [resultId, setResultId] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
        getMatchStatistic();
        getResultValues();
    }, [BASE_URL]);
    

    const getMatchStatistic = async () => {
        try {
            const response = await fetch(`${BASE_URL}/matches-statistics/${id}`);
            return response.json()
                .then(data => {
                    setResultId(data.result_id);
                    setMatchStatistic(data);
                    setError(false);
                    setIsLoading(false);
                })
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }

    const getResultValues = async () => {
        try {
            const response = await fetch(`${BASE_URL}/results/${resultId}`);
            return response.json()
                .then(data => {
                    setPlayers(data.players);
                    setTeams({
                        ...teams,
                        host: data.result["host.team_name"], 
                        host_id: data.result["host.id"],
                        guest: data.result["guest.team_name"],
                        guest_id: data.result.guest_id
                    });
                    setResult(data);
                    setError(null);
                    setIsLoading(false);
                })
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }




    console.log(players)
    const initialValues = {
        team_name: matchStatistic["teams.team_name"],
        event: matchStatistic.event,
        player_name: matchStatistic["players.name"],
        minute: matchStatistic.minute,
    };

    const validationSchema = Yup.object().shape({
        team_name: Yup.string().required("Team is required!"),
        event: Yup.string().required("Event is required!"),
        player: Yup.string().required("Player is required!"),
        minute: Yup.number("Minute is a number value!").required("Minute of the event is required!").min(0, "Invalid number!").max(90, "Invalid number!"),
    });

    const onSubmit = (data) => {
        data.result_id = id;
        if (data.team_name == result.result["host.team_name"]) data.team_id = result.result["host_id"];
        else data.team_id = result.result["guest_id"];
        data.player_id = players.find(player=>player.name == data.player_name).id;

        fetch(`${BASE_URL}/matches-statistics/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/results');
        })
    }
    return { initialValues, players, teams, result, error, isLoading, validationSchema, onSubmit }
}

export default useFormAddMatchStatistic;