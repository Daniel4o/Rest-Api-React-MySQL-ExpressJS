import './Players.css';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import Loading from '../loading/loading';
import useFormPlayers from './useFormPlayers';

const Players = () => {
  const { players, paranoidTeams, error, isLoading, deletePlayer } = useFormPlayers()

  if (isLoading || error != null) {
    return Loading(isLoading, error);
}

  return (
    <Container>
      <h2 className='h2'>Players</h2>
      <Button href="/Players/add">Add New</Button>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>№</th>
            <th>Team Name</th>
            <th>Name</th>
            <th>Position</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}.</td>
              <td>{player.teams.team_name}</td>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td>{player.age}</td>
              <td>
                <ButtonGroup>
                  <Button href={`/Players/edit/${player.id}`}>Edit</Button>
                  <Button variant='danger' onClick={() => deletePlayer(player.id)}>Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {paranoidTeams.length != 0 ? (
        <div>
          <h2 className='h2'>Free Transfers</h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>№</th>
                <th>Name</th>
                <th>Position</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paranoidTeams.map((player, index) => (
                <tr key={player.id}>
                  <td>{index + 1}.</td>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                  <td>{player.age}</td>
                  <td>
                    <ButtonGroup>
                      <Button href={`/Players/edit/${player.id}`}>Edit</Button>
                      <Button variant='danger' onClick={() => deletePlayer(player.id)}>Delete</Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : null}
      <Button href='/'>Back To Home Page</Button>
    </Container>
  )
}

export default Players;
