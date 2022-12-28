import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button1 } from "./Button1";
import "./Styles/paypage.css";
// import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

// charge wallet

function Paypage() {
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [cvv, setCvv] = useState("");
  const [exp, setExp] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (card.match(/^\d{16}$/ && cvv.match(/^\d{3}$/))) {
      AuthService.chargeWallet({
        method: "creditcard",
        data: {
          number: card,
          cvv: cvv,
          brand: "MasterCard",
          expired: exp,
          amount: amount,
        },
      }).then(
        () => {
          navigate("/user/my-wallet");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert("d5l number s7 lwsma7t");
    }
  };
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
                  onChange={(e) => setExp(e.target.value)}
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
                onChange={(e) => setAmount(e.target.value)}
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
