import React from "react";
import SoccerLineUp from "react-soccer-lineup";
import { Container, Spinner, Nav, Table, Row } from "react-bootstrap";
import "./lineUps.css";
import Formations from "./formations";
const LineUps = () => {
  const { homeTeam, awayTeam, finalResult, error, isLoading, id, teamNames } = Formations();
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

       <Nav id="nav" variant="tabs" href={'/matches-statistics/' + id}>
        <Nav.Item>
          <Nav.Link href={'/matches-statistics/' + id}>Match Statistics</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={"/matches-statistics/line-ups/" + id}>View Lineups</Nav.Link>
        </Nav.Item>

   
              <h2 className="finalResultFormations">
                {teamNames[0]}&ensp;{finalResult}&ensp;{teamNames[1]}
              </h2>
           

        <SoccerLineUp
          size={"big"}
          pattern={"lines"}
          awayTeam={awayTeam()}
          homeTeam={homeTeam()}
        />
      </Nav>

    </Container>
  );
}

export default LineUps;