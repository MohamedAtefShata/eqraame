import React from "react";
import { Button } from "./Button";
import "./Styles/Log_in.css";
import axios from "axios";

function Log_in() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    axios
      .post("http://localhost:5000/api/auth", user)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="login-container">
        <form>
          <h6 className="login-heading">log in to your eqraame account</h6>
          <div className="login-btn">
            <Button
              className="btns"
              buttonStyle="btn--outline--scr"
              buttonSize="btn--large"
              buttonTrans="btn--scr"
              buttonPath="/login"
            >
              {/* <img className='googl-icon' src='./icons/google-icon.png' alt=''/> */}
              continue with google
            </Button>
            <Button
              className="btns"
              buttonStyle="btn--outline--scr"
              buttonSize="btn--large"
              buttonTrans="btn--scr"
              buttonPath="/login"
            >
              continue with facebook
            </Button>
          </div>
          <div className="input-container">
            <div className="input-field">
              <input type="text" required="required" />
              <span>email</span>
            </div>
            <div className="input-field">
              <input type="password" required="required" />
              <span>password</span>
            </div>
          </div>
          <div className="log-btn">
            <Button
              type="submit"
              className="btns"
              buttonStyle="btn--primary--logsign"
              buttonSize="btn--large"
              buttonTrans="btn--logsign"
              buttonPath="/myprofile"
            >
              log in
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Log_in;
