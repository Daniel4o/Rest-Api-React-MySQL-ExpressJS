import { Link } from 'react-router-dom';
import useFormTeamPlayersById from './useFormTeamPlayersById';
import { Spinner, Container, Table, Button, ButtonGroup } from 'react-bootstrap';

const TeamPlayersById = () => {
    const { teamPlayersById, error, isLoading } = useFormTeamPlayersById();

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }
    if (error) {
        return <div>There was an error: {error}</div>
    }

    return (
        <Container className='containerTeams'>
            <h2 className='h2'>Players</h2>
            <Table stripped bordered hover variant='dark'>
                <thead>
                    <tr>
                        <th width="150">№</th>
                        <th width="400">Name</th>
                        <th>Position</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {teamPlayersById.map((value, index) => (
                        <tr key={value['players.id']}>
                            <td>{index + 1}.</td>
                            <td>{value['players.name']}</td>
                            <td>{value['players.position']}</td>
                            <td>{value['players.age']}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ButtonGroup className="buttonGroupTeamPlayers">
                <Button href='/Team-Players'>Back To Team Players</Button>
                <Button variant="secondary" id="home" href='/'>Home Page</Button>
            </ButtonGroup>
        </Container>
    )
}

export default TeamPlayersById;