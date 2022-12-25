import "../Styles/App.css";
import ProfileTemp from "../ProfileTemp";
import React, { useState, useEffect } from "react";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../Styles/RemoveAccount.css";
import { Button1 } from "../Button1";
import "../Styles/loading.css";

function RemoveAccount() {
  const [userinfo, setuserinfo] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [name, setName] = useState("");
  const [loading, setloading] = useState(true);
  const [selected, setSelected] = useState("");
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
