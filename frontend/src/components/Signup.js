import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Button1 } from "./Button1";
import "./Styles/Signup.css";
import Dropdown from "./Dropdown";
import AuthService from "../services/auth.service";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(name, email, password, birthdate, selected).then(
        (response) => {
          console.log("Sign up successfully", response);
          navigate("/login");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="sign-container">
        <form onSubmit={handleSignup}>
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
              <input
                type="text"
                required="required"
                onChange={(e) => setName(e.target.value)}
              />
              <span>name</span>
            </div>
            <div className="input-field">
              <input
                type="text"
                required="required"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>email</span>
            </div>
            <div className="input-field">
              <input
                type="password"
                required="required"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>password</span>
            </div>
            <div className="input-field">
              <input
                type="date"
                required="required"
                onChange={(e) => setBirthdate(e.target.value)}
              />
              <span className="birth-edit">birthdate</span>
            </div>
          </div>
          <Dropdown selected={selected} setSelected={setSelected} />
          <div className="sign-btn">
            <Button1
              type="submit"
              className="btns"
              buttonStyle="btn--primary--logsign"
              buttonSize="btn--large"
              buttonTrans="btn--logsign"
              buttonPath="/user/edit-profile"
            >
              Sign up
            </Button1>
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
