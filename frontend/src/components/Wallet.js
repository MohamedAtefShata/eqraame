import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import "./Styles/loading.css";
import "./Styles/Wallet.css";
import ProfileTemp from "./ProfileTemp";

function Wallet() {
  const [userinfo, setuserinfo] = useState([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setloading(true);
    PostService.getuserinfo().then(
      (response) => {
        setloading(false);
        setuserinfo(response.data.user);
      },
      (error) => {
        console.log("Private page", error.response);
        setloading(false);
        // Invalid token
        if (error.response && error.response.status !== 200) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
  }, []);

  if (loading) {
    return (
      <>
        <div id="wrapper">
          <div className="profile-main-loader">
            <div className="loader">
              <svg className="circular-loader" viewBox="25 25 50 50">
                <circle
                  className="loader-path"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke="#70c542"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="mywallet-container">
        <ProfileTemp />
        <div className="center-handel">
          <div className="wallet-Header">
            <h1 className="header">My Wallet</h1>
            <h3 className="wallet-disc">
              Wallet balance and charge more money
            </h3>
          </div>
          <div className="wallet-contanier">
            <div className="wallet-wapper">
              <img src="/images/wallet.png" alt="" className="wallt-img" />
              <p className="wallet-balance">
                <b className="balance">{"Your Balance: "}</b> 154$
              </p>
            </div>
            <form>
              <Button
                className="btns"
                buttonStyle="btn--primary--logsign"
                buttonSize="btn--medium"
                buttonTrans="btn--logsign"
                buttonPath="/charging"
              >
                Charge Your Wallet
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallet;
