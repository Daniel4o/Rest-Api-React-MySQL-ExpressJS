import { Link, } from "react-router-dom";
import { Spinner, Button, ButtonGroup, Table, Container, Row, Col, Nav } from "react-bootstrap";
import useFormMatchesStatistics from "./useFormMatchesStatistics";
import "./MatchesStatistics.css"

const MatchesStatistics = () => {
  const { matchesStatistics, finalResult, id, teamNames, isLoading, error, checkEvent, showResult, deleteMatchStatistic } = useFormMatchesStatistics();

  if (isLoading) {
    return (
      <Container className="content">
        <Spinner className="position-absolute top-50 start-50 translate-middle" animation="border" variant="primary" />
      </Container>
    )
  }
  if (error) {
    return <div>There was an error: {error}</div>
  }

  return (
    <Container id="add" className="content">
      <Nav id="nav" variant="tabs" defaultActiveKey={'/matches-statistics/' + id}>
        <Nav.Item>
          <Nav.Link href={'/matches-statistics/' + id}>Match Statistics</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={"/matches-statistics/line-ups/" + id}>View Lineups</Nav.Link>
        </Nav.Item>
        <Container>
          <Table id="table" className='text-white bg-dark'>
            <thead >
              <Row className="finalResult">
                {teamNames[0]}&ensp;{finalResult}&ensp;{teamNames[1]}
              </Row>
            </thead>
            <thead>
              <tr>
                <th>Minute</th>
                <th>Home Player</th>
                <th>Host Event</th>
                <th>Result</th>
                <th>Guest Event</th>
                <th>Away Player</th>
                <th>Actions</th>
              </tr>
            </thead>
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
        </Container>
      </Nav>
      <ButtonGroup id="buttonGroup">
        <Button href={"/matches-statistics/add/" + id} className="btn btn-outline-light">Add New</Button>
        <Button variant="secondary" href="/results" id="backButton" className="btn btn-outline-light">Back to Results</Button>
      </ButtonGroup>
    </Container>
  )
}

export default MatchesStatistics;
