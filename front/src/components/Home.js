import React from "react";
import { Link } from "react-router-dom";
import {Carousel} from "react-bootstrap";
import petStuff1 from "../images/pet-stuff.jpg";
import petStuff2 from "../images/pet-stuff2.jpg";
import petStuff3 from "../images/pet-stuff3.jpg";

function Home() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img src={petStuff2} alt="" className="d-block w-100" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={petStuff3} alt="" className="d-block w-100" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={petStuff1} alt="" className="d-block w-100" />
        </Carousel.Item>
      </Carousel>
      <div className="col align-self-center">
        <h1 className = "title">Welcome to the Store!</h1>
        <p>You can find everything you need here for your pets!</p>
        <Link to="/login"><button type="button" className="btn btn-color btn-primary btn-lg">Start Shooping</button></Link>
      </div>
    </div>
  );
}

export default Home;