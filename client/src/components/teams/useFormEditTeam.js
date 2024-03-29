import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const FormEditTeam = () => {
    const BASE_URL = process.env.REACT_APP_URL;

    const [team, setTeam] = useState([]);
    const [team_name, setTeamName] = useState([]);
    const [formation, setFormation] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getTeams();
        getTeamValues();
    }, [BASE_URL]);

    const getTeams = async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams`)
            return response.json()
                .then(data => {
                    const team = data.map(team => team.team_name).flat();
                    setTeam(team);
                    setError(null);
                    setIsLoading(false);
                })
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }
    const getTeamValues = async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams/${id}`,)
            return response.json()
                .then(data => {
                   setFormation(data.formation.map(a=>a.formation)[0]);
                    const teamName = data.teamPlayers.map(team => team.team_name).flat();
                    setTeamName(teamName[0]);
                    setError(null);
                    setIsLoading(false);
                })
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }

    for (var i = 0; i < team.length; i++) {
        if (team[i] === team_name) {
            team.splice(i, 1);
        }
    }

    const initialValues = {
        team_name: team_name,
        formation: formation,
    };

    const validationSchema = Yup.object().shape({
        team_name: Yup.string().required("Team Name field is required!").min(3, "Team name is too short, minimum is 3 characters!").max(20, "Team name is too long, maximum is 20 characters!")
            .notOneOf(team, 'Team with this name exists!'),
        formation: Yup.string().required("You need to provide formation for the team!")
    });

    const onSubmit = (data) => {
        fetch(`${BASE_URL}/teams/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/teams');
        })
    }

    return { initialValues, validationSchema, onSubmit, error, isLoading }

}

export default FormEditTeam;