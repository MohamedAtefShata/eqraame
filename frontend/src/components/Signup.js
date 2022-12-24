import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Styles/Signup.css";
import Dropdown from "./Dropdown";
// import axios from "axios";

// const dropdown = document.querySelectorAll(".dropdown-container");
// const options = ["Teacher", "Student"];

function Signup() {
  const [selected, setSelected] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const user = {
  //     name: data.get("name"),
  //     email: data.get("email"),
  //     password: data.get("password"),
  //     "confirm-password": data.get("password"),
  //     role: data.get("role"),
  //     birthdate: data.get("birthdate"),
  //     avatar: "default",
  //   };
  //   axios
  //     .post("http://localhost:5000/api/user/register")
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <div className="sign-container">
        <form>
          <h5 className="sign-heading">sign up to eqraame</h5>
          <div className="sign-btn">
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
              <span>name</span>
            </div>
            <div className="input-field">
              <input type="text" required="required" />
              <span>email</span>
            </div>
            <div className="input-field">
              <input type="password" required="required" />
              <span>password</span>
            </div>
            <div className="input-field">
              <input type="date" required="required" />
              <span className="birth-edit">birthdate</span>
            </div>
          </div>
          <Dropdown selected={selected} setSelected={setSelected} />
          <div className="sign-btn">
            <Button
              type="submit"
              className="btns"
              buttonStyle="btn--primary--logsign"
              buttonSize="btn--large"
              buttonTrans="btn--logsign"
              buttonPath="/myprofile"
            >
              Sign up
            </Button>
            <h5>
              Already have account?
              <Link to="/signup">{"  Log In"}</Link>
            </h5>
          </div>
        </form>
      </div>
    </>
  );
}
export default Signup;

// Login /register gj
// Add course
// Add leason
// View courses
// Buy course
// My courses
// My wallet
// Profile (avatar, birthdate, )
// Searching
