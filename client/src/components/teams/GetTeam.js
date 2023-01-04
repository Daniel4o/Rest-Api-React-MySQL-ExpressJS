import { Spinner, Table, Button, Container, ButtonGroup } from 'react-bootstrap';
import useFormGetTeam from './useFormGetTeam';

const Team = () => {
    const { team, homeResults, awayResults, players, error, isLoading } = useFormGetTeam();

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }
    if (error) {
        return <div>There was an error: {error}</div>
    }

    return (
        <Container>
            {homeResults.length != 0 ? (
                <div>
                    <h2 className='h2'>Home Results</h2>
                    <Table className="table" striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Date</th>
                                <th>Home Team</th>
                                <th>Home Goals</th>
                                <th>Away Goals</th>
                                <th>Away Team</th>
                                <th>Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {homeResults.map((homeResult, index) => (
                                <tr key={homeResult.id}>
                                    <td>{index + 1}.</td>
                                    <td>{homeResult['homeTeam.date']} </td>
                                    <td>{team}</td>
                                    <td>{homeResult['homeTeam.home_goals']}</td>
                                    <td>{homeResult['homeTeam.away_goals']}</td>
                                    <td>{homeResult['team_name']}</td>
                                    <td>{homeResult['homeTeam.venue']}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : null}
            {awayResults.length != 0 ? (
                <div>
                    <h2 className='h2'>Away Results</h2>
                    <Table className="table" striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Date</th>
                                <th>Home Team</th>
                                <th>Home Goals</th>
                                <th>Away Goals</th>
                                <th>Away Team</th>
                                <th>Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {awayResults.map((awayResult, index) => (
                                <tr key={awayResult.id}>
                                    <td>{index + 1}.</td>
                                    <td>{awayResult['awayTeam.date']} </td>
                                    <td>{awayResult['team_name']}</td>
                                    <td>{awayResult['awayTeam.home_goals']}</td>
                                    <td>{awayResult['awayTeam.away_goals']}</td>
                                    <td>{team}</td>
                                    <td>{awayResult['awayTeam.venue']}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : null}
            {players.length != 0 ? (
                <div>
                    <h2 className='h2'>Players</h2>
                    <Table className="table" striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player, index) => (
                                <tr key={player.id}>
                                    <td>{index + 1}.</td>
                                    <td>{player['players.name']}</td>
                                    <td>{player['players.position']}</td>
                                    <td>{player['players.age']}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : null}
            <ButtonGroup className='buttonGroupTeamPlayers'>
                <Button href='/teams' className='Button'>Back to Teams</Button>
                <Button id="home" variant="secondary" href='/' >Back to Home Page</Button>
            </ButtonGroup>
        </Container>
    )
}

export default Team;