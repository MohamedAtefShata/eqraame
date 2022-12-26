import React, { useState } from "react";
import { Button1 } from "./Button1";
import "./Styles/paypage.css";
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
  const handleSubmit = async (e) => {};
  return (
    <>
      <div className="payment-container">
        <form id="form" onSubmit={handleSubmit}>
          <h2 className="payment-heading">
            <img className="payimg" src="/icons/credit.png" alt="" />
            Payment
          </h2>
          <div className="pay-container">
            <div className="pay-field">
              <input
                type="text"
                required="required"
                onChange={(e) => setName(e.target.value)}
              />
              <span>card name</span>
            </div>
            <div className="pay-field">
              <input
                required="required"
                onChange={(e) => setCard(e.target.value)}
              />
              <span>card number</span>
            </div>
            <div className="text-grid">
              <div className="pay-field">
                <input
                  type="month"
                  required="required"
                  onChange={(e) => setExpm(e.target.value)}
                />
                <span>exp date</span>
              </div>
              <div className="pay-field">
                <input
                  type="card"
                  required="required"
                  onChange={(e) => setCvv(e.target.value)}
                />
                <span>CV2</span>
              </div>
            </div>
            <div className="pay-field">
              <input
                type="number"
                required="required"
                onChange={(e) => setExpy(e.target.value)}
              />
              <span>amount</span>
            </div>
          </div>
          <div className="pay-btn">
            <Button1
              type="submit"
              className="btns"
              buttonStyle="btn--primary--logsign"
              buttonSize="btn--large"
              buttonTrans="btn--logsign"
              buttonPath="/login"
            >
              Add Money
            </Button1>
          </div>
        </form>
      </div>
    </>
  );
}
export default Paypage;
