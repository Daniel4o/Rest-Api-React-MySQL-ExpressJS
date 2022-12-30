import { Form, Spinner, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import useFormEditMatchStatistic from './useFormEditMatchStatistic';
import './MatchesStatistics.css';
import { useState, useEffect } from 'react';

const EditMatchStatistic = (submitForm) => {
    const { initialValues, teams, players, error, isLoading, validationSchema, onSubmit } = useFormEditMatchStatistic(submitForm);
    const [teamSelected, setTeamSelected] = useState(initialValues.team_name);
    const [playerSelected, setPlayerSelected] = useState(initialValues.player_name);
   
    useEffect(() => {
        setTeamSelected(initialValues.team_name);
        setPlayerSelected(initialValues.player_name);
    }, [initialValues.team_name,initialValues.player_name]);

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }
    if (error) {
        return <div>There was an error: {error}</div>
    }

    return (
        <div className="addMatchStatistic">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                    <Form className="formContainer2" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Team:</Form.Label>
                            <Form.Select
                                id="team_name"
                                name="team_name"
                                onChange={e => {
                                    const { value } = e.target;
                                    setTeamSelected(value);
                                }}
                                onBlur={handleBlur}
                                value={values.team_name = teamSelected}
                                isInvalid={!!errors.team_name}
                            >
                                <option label='Select Team'></option>
                                <option key={teams.host_id} value={teams.host}>{teams.host}</option>
                                <option key={teams.guest_id} value={teams.guest}>{teams.guest}</option>
                            </Form.Select>
                            <ErrorMessage name="team_name" component="span" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event:</Form.Label>
                            <Form.Select
                                id="event"
                                name="event"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.event}
                                isInvalid={!!errors.event}
                            >
                                <option label='Select Event'></option>
                                <option value="Goal">Goal</option>
                                <option value="Penalty">Penalty</option>
                                <option value="Yellow Card">Yellow Card</option>
                                <option value="Red Card">Red Card</option>
                            </Form.Select>
                            <ErrorMessage name="event" component="span" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Player:</Form.Label>
                            <Form.Select
                                id="player"
                                name="player"
                                onChange={e => {
                                    const { value } = e.target;
                                    setPlayerSelected(value);
                                }}
                                onBlur={handleBlur}
                                value={values.player = playerSelected}
                                isInvalid={!!errors.player}
                            >
                                <option label='Select Player'></option>
                                {players.filter(player =>
                                    player["teams.team_name"] == teamSelected)
                                    .map(player =>
                                        <option key={player.id} value={player.name}>
                                            {player.name}
                                        </option>
                                    )}
                            </Form.Select>
                            <ErrorMessage name="player" component="span" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Minute:</Form.Label>
                            <Form.Control
                                autocomplete="off"
                                id="minute"
                                name="minute"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.minute}
                                isInvalid={!!errors.minute}
                            />
                            <ErrorMessage name="minute" component="span" />
                        </Form.Group>
                        <Button type="submit" variant="success"> Edit Statistic</Button>
                        <Button href="/results" variant="secondary" >Cancel</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EditMatchStatistic;