import { Link, } from "react-router-dom";
import { Spinner, Button, ButtonGroup, Table, Container, Row, Col } from "react-bootstrap";
import useFormMatchesStatistics from "./useFormMatchesStatistics";
import "./MatchesStatistics.css"

const MatchesStatistics = () => {
  const { matchesStatistics, isLoading, error, deleteResult } = useFormMatchesStatistics();
  console.log(matchesStatistics)
  if (isLoading) {
    return (<Spinner animation="border" variant="primary" />)
  }
  if (error) {
    return <div>There was an error: {error}</div>
  }

  return (
    <Container className="content">
      {matchesStatistics.map((statistic, index) => (
        <Row className='text-white bg-dark' xs="auto">
          <Col md={{ span: 4 }}>{statistic.minute}'</Col>
          <Col xs="auto">{statistic.player_id}</Col>
          <Col >{statistic.event}</Col>
          <Col >{statistic.event}</Col>
          <Col>{statistic.event}</Col>
          <Col>{statistic.player_id}</Col>
        </Row>
      ))}
    </Container>
  )
}

export default MatchesStatistics;
