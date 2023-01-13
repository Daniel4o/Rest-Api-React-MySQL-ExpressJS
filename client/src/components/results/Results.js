import { Button, ButtonGroup, Container, Table } from "react-bootstrap";
import useFormResults from './useFormResults';
import Loading from "../loading/loading";

const Results = () => {
  const { results, isLoading, error, deleteResult } = useFormResults();

  if (isLoading || error != null) {
  return Loading(isLoading,error);
  }

  return (
    <Container className="containerTeams">
      <h2 className='h2'>Results</h2>
      <Button href="/Results/add">Add New</Button>
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
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result.id}>
              <td>{index + 1}.</td>
              <td >{result.date}</td>
              <td style={{
                color:
                  !!(result.home_goals > result.away_goals) ? "green" :
                    !!(result.home_goals === result.away_goals) ? null : "red"
              }}>{result['host.team_name']}</td>
              <td style={{
                color:
                  !!(result.home_goals > result.away_goals) ? "green" :
                    !!(result.home_goals === result.away_goals) ? null : "red"
              }}>{result.home_goals}</td>
              <td style={{
                color:
                  !!(result.home_goals < result.away_goals) ? "green" :
                    !!(result.home_goals === result.away_goals) ? null : "red"
              }}>{result.away_goals}</td>
              <td style={{
                color:
                  !!(result.home_goals < result.away_goals) ? "green" :
                    !!(result.home_goals === result.away_goals) ? null : "red"
              }}>{result['guest.team_name']}</td>
              <td>{result.venue}</td>
              <td>
                <ButtonGroup>
                  <Button href={`/Matches-Statistics/${result.id}`} >View</Button>
                  <Button variant="secondary" href={`/Results/edit/${result.id}`}>Edit</Button>
                  <Button variant="danger" onClick={() => deleteResult(result.id)}>Delete</Button>
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

export default Results;
