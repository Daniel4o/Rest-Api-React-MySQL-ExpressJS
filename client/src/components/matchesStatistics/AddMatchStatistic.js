import { Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import useFormAddMatchStatistic from './useFormAddMatchStatistic';
import './MatchesStatistics.css';
import { useState } from 'react';

const AddMatchStatistic = (submitForm) => {
    const { initialValues, result, error, isLoading, validationSchema, onSubmit } = useFormAddMatchStatistic(submitForm)
   const [teamSelected,setTeamSelected] = useState("");
   
    const changeSelectedTeam= (event) => {
        setTeamSelected(event.target.value);
    }

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }
    if (error) {
        return <div>There was an error: {error}</div>
    }
    
    let players = null;
    if(teamSelected == result.result["host.team_name"]) {
        players = result["hostPlayers"].map((players)=><option key={players.name} value={players.name}>{players.name}</option>)
    }
    if(teamSelected == result.result["guest.team_name"]) {
        players = result["guestPlayers"].map((players)=><option key={players.name} value={players.name}>{players.name}</option>)
    }
    


    return (
        <div className="addMatchStatistic">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                    <Form className="formContainer" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Team:</Form.Label>
                            <Form.Select
                                id="inputAddMatchStatistic"
                                name="team_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.team_name}
                                isInvalid={!!errors.team_name}
                            >
                                <option label='Select Team'></option>
                                <option key={result.result} value={result.result}>{result.result["host.team_name"]}</option>
                                <option key={result.result} value={result.result}>{result.result["guest.team_name"]}</option>
                            <ErrorMessage name="team_name" component="span" />
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event:</Form.Label>
                            <Form.Select
                                id="inputAddMatchStatistic"
                                name="event"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.event}
                                isInvalid={!!errors.event}
                            >
                                <option label='Select Event'></option>
                                <option>Goal</option>
                                <option>Penalty</option>
                                <option>Yellow Card</option>
                                <option>Red Card</option>                           
                                 </Form.Select>
                            <ErrorMessage name="event" component="span" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Player:</Form.Label>
                            <Form.Select
                                id="inputAddMatchStatistic"
                                name="player"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.player}
                                isInvalid={!!errors.player}
                            >
                              <option label='Select Player'></option>
                               {result.players.filter(players=>players["teams.team_name"] == "Man United").map(players=><option key={players.name} value={players.name}>{players.name}</option>)}
                            <ErrorMessage name="player" component="span" />
                            </Form.Select>
                        </Form.Group>
                           
                        <Form.Group>
                            <div><Form.Label>Venue:</Form.Label></div>
                            <ErrorMessage name="venue" component="span" />
                            <Form.Control
                                autocomplete="off"
                                id="inputCreateResult"
                                name="venue"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.venue}
                                isInvalid={!!errors.venue}
                            />
                        </Form.Group>
                        <button type="submit"> Create Result</button>
                        <Link to={'/results'} className='edit'>Cancel</Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddMatchStatistic;