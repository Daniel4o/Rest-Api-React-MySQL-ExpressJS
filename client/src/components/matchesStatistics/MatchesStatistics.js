import { Link, } from "react-router-dom";
import IMAGES from '../homePage/images/images'
import { Spinner, Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";
import useFormMatchesStatistics from "./useFormMatchesStatistics";
import "./MatchesStatistics.css"

const MatchesStatistics = () => {
  const { matchesStatistics, finalResult, id, teamNames, isLoading, error, deleteMatchStatistic } = useFormMatchesStatistics();
  if (isLoading) {
    return (<Spinner animation="border" variant="primary" />)
  }
  if (error) {
    return <div>There was an error: {error}</div>
  }

  const checkEvent = (event) => {
    if (event == "Goal") {
      return <img src={IMAGES.ball} />;
    }
    if (event == "Penalty") {
      return <img src={IMAGES.penalty} />;
    }
    if (event == "Yellow Card") {
      return <img src={IMAGES.yellowCard} />;
    }
    if (event == "Red Card") {
      return <img src={IMAGES.redCard} height="24px" width="24px" />;
    }
  }

  const showResult = (hostEvent, guestEvent, result) => {
    if (hostEvent == "Goal" || guestEvent == "Goal") return result;
    return null;
  }

  return (
    <Container className="content">
      <Row className='text-white bg-dark'>
        <Col className="finalResult">
          <h3>{teamNames[0]}&ensp;{finalResult}&ensp;{teamNames[1]}</h3>
        </Col>
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
            <Link to={`/matches-statistics/edit/${statistic.id}`} className='edit'>Edit</Link>
          </Col>
          <Col>
            <Button variant='danger' onClick={() => deleteMatchStatistic(statistic.id)}>Delete</Button>
          </Col>
        </Row>
      ))}
      <Link className="addButton" to={`/matches-statistics/add/${id}`}>Add New</Link>
    </Container>
  )
}

export default MatchesStatistics;
