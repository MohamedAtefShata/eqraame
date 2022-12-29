import "../Styles/App.css";
import ProfileTemp from "../ProfileTemp";
import React, { useState, useEffect } from "react";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../Styles/RemoveAccount.css";
import { Button1 } from "../Button1";
import "../Styles/loading.css";
import LoadingPage from "./LoadingPage";

function RemoveAccount() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const del = async () => {
    setloading(true);
    await PostService.DEL().then(
      () => {
        setloading(false);
        AuthService.logout();
        navigate("/login");
        window.location.reload();
      },
      (error) => {
        setloading(false);

        console.log(error);
      }
    );
  };
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <>
      <div className="removeAccount-container">
        <ProfileTemp />
        <div className="center-handel">
          <div className="remove-Header">
            <h1 className="header">Remove Account</h1>
            <h3 className="disc">Remove your account forever</h3>
          </div>
          <div className="remove-contanier">
            <p className="worning">
              <b className="wo">Warning!</b> If you close your account, you will
              be unsubscribed from all your courses, and will lose access
              forever.
            </p>
            <form>
              <Button1
                type="submit"
                className="btns"
                buttonStyle="btn--primary--logsign"
                buttonSize="btn--medium"
                buttonTrans="btn--logsign"
                onClick={(e) => del()}
              >
                Remove Account
              </Button1>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default RemoveAccount;
