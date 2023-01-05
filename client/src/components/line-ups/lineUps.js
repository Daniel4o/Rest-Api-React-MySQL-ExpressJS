import React from "react";
import SoccerLineUp from "react-soccer-lineup";
import { Container } from "react-bootstrap";
import "./lineUps.css";
import Formations from "./formations";
const LineUps = () => { 
    const {homeTeam, awayTeam} = Formations();
    
  return (
    <Container className="container">
    <div className="lineUps">
      <SoccerLineUp
        size={"big"}
        pattern={"lines"}
        awayTeam={awayTeam()}
        homeTeam={homeTeam()}
      />
    </div>
    </Container>
  );
}

export default LineUps;