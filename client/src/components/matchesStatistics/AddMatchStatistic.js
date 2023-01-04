import { Form, Spinner, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import useFormAddMatchStatistic from './useFormAddMatchStatistic';
import './MatchesStatistics.css';
import { useState } from 'react';

const AddMatchStatistic = (submitForm) => {
    const [teamSelected, setTeamSelected] = useState("");
    const { initialValues, result, id, error, isLoading, validationSchema, onSubmit } = useFormAddMatchStatistic(submitForm);

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
                                <option key={result.result["host_id"]} value={result.result["host.team_name"]}>{result.result["host.team_name"]}</option>
                                <option key={result.result["guest_id"]} value={result.result["guest.team_name"]}>{result.result["guest.team_name"]}</option>
                            </Form.Select>
                            <ErrorMessage name="team_name" component="span" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event:</Form.Label>
                            <Form.Select
                                id="event"
                                name="event"
                                onChange={handleChange}
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.player}
                                isInvalid={!!errors.player}
                            >
                                <option label='Select Player'></option>
                                {result.players.filter(players =>
                                    players["teams.team_name"] == teamSelected)
                                    .map(players =>
                                        <option key={players.id} value={players.id}>
                                            {players.name}
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
                        <Button variant="success" type="submit"> Create Statistic</Button>
                        <Button href={"/matches-statistics/" + id} variant="danger">Cancel</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddMatchStatistic;