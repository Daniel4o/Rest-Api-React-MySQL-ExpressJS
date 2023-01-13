import React from "react";
import SoccerLineUp from "react-soccer-lineup";
import { Container, Spinner, Nav, Table } from "react-bootstrap";
import Loading from "../loading/loading";
import "./lineUps.css";
import Formations from "./formations";

const LineUps = () => {
  const { homeTeam, awayTeam, formations, finalResult, error, isLoading, id, teamNames } = Formations();

  if (isLoading || error != null) {
    return Loading(isLoading, error);
}

  return (
    <Container className="content">
      <Container className="statisticsContainer">
        <Nav variant="tabs" href={'/matches-statistics/' + id}>
          <Table className="navi" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>
                  <Nav.Item>
                    <Nav.Link href={'/matches-statistics/' + id}>Match Statistics</Nav.Link>
                  </Nav.Item>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="lineUps">
                  {teamNames[0]}&ensp;{finalResult}&ensp;{teamNames[1]}
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="field">
                  <SoccerLineUp
                    size={"normal"}
                    pattern={"lines"}
                    awayTeam={awayTeam()}
                    homeTeam={homeTeam()}
                  />
                </td>
                <div className="flexContainer">
                  <h3 className="left">{teamNames[0]}: {formations.hostFormation}</h3>
                  <h3 className="right">{teamNames[1]}: {formations.guestFormation}</h3>
                </div>
              </tr>
            </tbody>
          </Table>
        </Nav>
      </Container>
    </Container>
  );
}

export default LineUps;