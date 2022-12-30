import { Link, } from "react-router-dom";
import { Spinner, Button, ButtonGroup, Container, Row, Col, Pagination } from "react-bootstrap";
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
    <Container className="content">
      <Row className='text-white bg-dark'>
        <Col className="finalResult">
          <h3>{teamNames[0]}&ensp;{finalResult}&ensp;{teamNames[1]}</h3>
        </Col>
    <Row>  
      <Button id="lineupsButton" type="primary">View Lineups</Button>
      </Row>  
    </Row>
      {matchesStatistics.map(statistic => (
        <Row className='text-white bg-dark' >
          <Col md={{ span: 2 }}>{statistic.minute}'</Col>
          <Col>{statistic.hostPlayer}</Col>
          <Col>{checkEvent(statistic.hostEvent)}</Col>
          <Col>{showResult(statistic.hostEvent, statistic.guestEvent, statistic.currResult)}</Col>
          <Col>{checkEvent(statistic.guestEvent)}</Col>
          <Col>{statistic.guestPlayer}</Col>
          <Col>
            <Link to={"/matches-statistics/edit/" + statistic.id} state={statistic.result_id}><Button variant="warning">Edit</Button></Link>
          </Col>
          <Col>
            <Button variant='danger' onClick={() => deleteMatchStatistic(statistic.id)}>Delete</Button>
          </Col>
        </Row>
      ))}
      <ButtonGroup id="buttonGroup">
        <Button href={"/matches-statistics/add/" + id} className="btn btn-outline-light">Add New</Button>
        <Button variant="secondary" href="/results" id="backButton" className="btn btn-outline-light">Back to Results</Button>
      </ButtonGroup>
    </Container>
  )
}

export default MatchesStatistics;
