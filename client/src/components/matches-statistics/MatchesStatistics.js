import { Link, } from "react-router-dom";
import { Spinner, Button, ButtonGroup, Table, Container, Nav } from "react-bootstrap";
import useFormMatchesStatistics from "./useFormMatchesStatistics";
import Loading from "../loading/loading";
import "./MatchesStatistics.css"

const MatchesStatistics = () => {
  const { matchesStatistics, finalResult, id, teamNames, isLoading, error, checkEvent, showResult, deleteMatchStatistic } = useFormMatchesStatistics();

  if (isLoading || error != null) {
    return Loading(isLoading, error);
}

  return (
    <Container className="content">
      <div className="statisticsContainer">
        <Nav className="border" variant="tabs" href={'/matches-statistics/' + id}>
          <Table className="navi" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th colSpan="7">
                  <Nav.Item>
                    <Nav.Link href={"/matches-statistics/line-ups/" + id}>Lineups</Nav.Link>
                  </Nav.Item>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <td colSpan="7">
                    {teamNames[0]}&ensp;{finalResult}&ensp;{teamNames[1]}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Minute</th>
                <th>Home Player</th>
                <th>Host Event</th>
                <th>Result</th>
                <th>Guest Event</th>
                <th>Away Player</th>
                <th>Actions</th>
              </tr>
            </tbody>
            <tbody>
              {matchesStatistics.map(statistic => (
                <tr key={statistic.id}>
                  <td> {statistic.minute}'</td>
                  <td>{statistic.hostPlayer}</td>
                  <td>{checkEvent(statistic.hostEvent)}</td>
                  <td>{showResult(statistic.hostEvent, statistic.guestEvent, statistic.currResult)}</td>
                  <td>{checkEvent(statistic.guestEvent)}</td>
                  <td>{statistic.guestPlayer}</td>
                  <td>
                    <Link to={"/matches-statistics/edit/" + statistic.id} state={statistic.result_id}>
                      <Button variant="warning">Edit</Button>
                    </Link>
                    <Button variant='danger' onClick={() => deleteMatchStatistic(statistic.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Nav>
      </div>
      <ButtonGroup id="buttonGroup">
        <Button href={"/matches-statistics/add/" + id} className="btn btn-outline-light">Add New</Button>
        <Button variant="secondary" href="/results" id="backButton" className="btn btn-outline-light">Back to Results</Button>
      </ButtonGroup>
    </Container>
  )
}

export default MatchesStatistics;
