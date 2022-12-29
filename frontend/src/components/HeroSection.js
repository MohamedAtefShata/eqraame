import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
// import React from "react";
import "./Styles/App.css";
import "./Styles/HeroSection.css";
import AuthService from "../services/auth.service";

function HeroSection() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  var [currentUser, setCurrentUser] = useState(undefined);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate();
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <>
      <div className="hero-container">
        <div className="hero-slogan">
          <h1 className="hero-title">Science have no limits</h1>
          <p className="hero-dis">
            Start, switch, or advance your career with more than 5,400 courses,
            Professional Certificates, and degrees from world-class universities
            and companies.
          </p>
          <div className="hero-btn">
            {currentUser ? (
              <>
                <Button
                  className="btns"
                  buttonStyle="btn--outline--scr"
                  buttonSize="btn--large"
                  buttonTrans="btn--scr"
                  buttonPath="/courses"
                >
                  NEW COURSES
                </Button>
                <Button
                  className="btns"
                  buttonStyle="btn--primary--scr"
                  buttonSize="btn--large"
                  buttonTrans="btn--scr"
                  buttonPath="/categories"
                >
                  CATEGORIES
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="btns"
                  buttonStyle="btn--outline--scr"
                  buttonSize="btn--large"
                  buttonTrans="btn--scr"
                  buttonPath="/signup"
                >
                  join as teacher
                </Button>
                <Button
                  className="btns"
                  buttonStyle="btn--primary--scr"
                  buttonSize="btn--large"
                  buttonTrans="btn--scr"
                  buttonPath="/signup"
                >
                  join as student
                </Button>
              </>
            )}
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
