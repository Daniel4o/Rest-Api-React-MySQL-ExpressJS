import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';

const useFormAddMatchStatistic = () => {
    const BASE_URL = process.env.REACT_APP_URL;

    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
        try {
            const response = await fetch(`${BASE_URL}/results/${id}`);
            return response.json()
                .then(data => {
                    setResult(data);
                    let addTeamName = data;
                    addTeamName.result.teams = [data.result["host.team_name"], data.result["guest.team_name"]];
                    setResult(addTeamName);
                    setError(null);
                    setIsLoading(false);
                })
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }, [BASE_URL]);

    const initialValues = {
        team_name: "",
        event: "",
        player_name: "",
        minute: "",
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
        data.player_id = data.player;

        fetch(`${BASE_URL}/matches-statistics`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/results');
        })
    }
    return { initialValues, result, error, isLoading, validationSchema, onSubmit }
}

export default useFormAddMatchStatistic;