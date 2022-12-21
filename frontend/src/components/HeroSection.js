import { Button } from "./Button";
import React from "react";
import "../App.css";
import "./HeroSection.css";

function HeroSection() {
  return (
    <>
      <div className="hero-container">
        <div className="hero-slogan">
          <h1 className="hero-title">science have no limits</h1>
          <p className="hero-dis">
            Start, switch, or advance your career with more than 5,400 courses,
            Professional Certificates, and degrees from world-class universities
            and companies.
          </p>
          <div className="hero-btn">
            <Button
              className="btns"
              buttonStyle="btn--outline--scr"
              buttonSize="btn--large"
              buttonTrans="btn--scr"
            >
              join as teacher
            </Button>
            <Button
              className="btns"
              buttonStyle="btn--primary--scr"
              buttonSize="btn--large"
              buttonTrans="btn--scr"
            >
              join as student
            </Button>
          </div>
        </div>
        <div className="slognimg">
          <img
            draggable="false"
            src="./images/HeroS.png"
            className="heroimg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default HeroSection;
