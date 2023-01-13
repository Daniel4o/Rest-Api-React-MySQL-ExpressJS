import { Button, ButtonGroup, Container, Table } from "react-bootstrap";
import useFormTeams from './useFormTeams'
import Loading from "../loading/loading";
import 'bootstrap/dist/css/bootstrap.min.css';

const Teams = () => {
    const { teams, error, deleteTeam, isLoading } = useFormTeams();

    if (isLoading || error != null) {
        return Loading(isLoading, error);
    }

    return (
        <Container className="containerTeams">
            <h2 className='h2'>Clubs</h2>
            <Button href="/Teams/add">Add New</Button>
            <Table striped bordered hover variant="dark" className='teams'>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Team</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {teams.map((team, index) => (
                        <tr key={team.id}>
                            <td>{index + 1}.</td>
                            <td>{team.team_name}</td>
                            <td>
                                <ButtonGroup>
                                    <Button href={`/Teams/${team.id}`}>View</Button>
                                    <Button href={`/Teams/edit/${team.id}`} variant="secondary">Edit</Button>
                                    <Button variant="danger" onClick={() => deleteTeam(team.id)}>Delete</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button href='/'>Back To Home Page</Button>
        </Container>
    )
}

export default Teams;