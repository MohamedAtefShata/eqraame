import React, { useState } from "react";
import { Button1 } from "./Button1";
import "./Styles/Log_in.css";
// import { Link, useNavigate } from "react-router-dom";
// import AuthService from "../services/auth.service";
function Paypage() {
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [cvv, setCvv] = useState("");
  const [expm, setExpm] = useState("");
  const [expy, setExpy] = useState("");
  const [course] = useState("courseay7aga");
  //   const navigate = useNavigate();
    const handleSubmit = async (e) => {}
  return (
    <>
      <div className="login-container">
        <form id="form" onSubmit={handleSubmit}>
          <h2 className="login-heading">Payment</h2>
          <div className="input-container">
            <div className="input-field">
              <input
                type="text"
                required="required"
                onChange={(e) => setName(e.target.value)}
              />
              <span>Name on Card</span>
            </div>
            <div className="input-field">
              <input
                required="required"
                onChange={(e) => setCard(e.target.value)}
              />
              <span>Credit card number</span>
            </div>
            <div className="input-field">
              <input
                type="card"
                required="required"
                onChange={(e) => setExpm(e.target.value)}
              />
              <span>expMonth</span>
            </div>
          </div>
          <div className="input-container">
            <div className="input-field">
              <input
                type="card"
                required="required"
                onChange={(e) => setCvv(e.target.value)}
              />
              <span>Cvv</span>
            </div>
            <div className="input-field">
              <input
                type="card"
                required="required"
                onChange={(e) => setExpy(e.target.value)}
              />
              <span>expYear</span>
            </div>
          </div>
          <p><a>{course} </a>
          <span className="price">$15</span></p>
          <div className="log-btn">
            <Button1
              type="submit"
              className="btns"
              buttonStyle="btn--primary--logsign"
              buttonSize="btn--large"
              buttonTrans="btn--logsign"
              buttonPath="/login"
            >
              Checkout
            </Button1>
          </div>
        </form>
      </div>
    </>
  );
}
export default Paypage;
