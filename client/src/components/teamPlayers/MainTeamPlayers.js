import { Container, Table, Button } from 'react-bootstrap';
import useFormMainTeamPlayers from './useFormMainTeamPlayers';
import Loading from '../loading/loading';

const TeamPlayers = () => {
    const { teams, teamPlayers, error, isLoading } = useFormMainTeamPlayers();

    if (isLoading || error != null) {
        return Loading(isLoading, error);
    }

    return (
        <Container className='containerTeams'>
            <h2 className='h2'>All Team Players</h2>
            <Table Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Team Name</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {teamPlayers.map((value, index) => (
                        <tr key={value['players.id']}>
                            <td>{index + 1}.</td>
                            <td>{value['team_name']}</td>
                            <td>{value['players.name']}</td>
                            <td>{value['players.age']}</td>
                            <td>{value['players.position']}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
                <h2 className='h2'>View Team Players</h2>
                <Table Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Team</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((value, index) => (
                            <tr key={value['id']}>
                                <td>{index + 1}.</td>
                                <td>{value['team_name']}</td>
                                <td>
                                    <Button href={`/Team-Players/${value.id}`}>View</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            <Button href='/'>Back to Home Page</Button>
        </Container>
    )
}

export default TeamPlayers;