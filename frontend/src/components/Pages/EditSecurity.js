import "../Styles/App.css";
import ProfileTemp from "../ProfileTemp";
import React, { useState, useEffect } from "react";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../Styles/EditSecurity.css";
import { Button1 } from "../Button1";
import "../Styles/loading.css";

function EditSecurity() {
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
      <div className="editPassword-container">
        <ProfileTemp />
        <div className="center-handel">
          <div className="password-Header">
            <h1 className="header">Account security</h1>
            <h3 className="disc">Change your current password</h3>
          </div>
          <div className="password-contanier">
            <form>
              <div className="updatePassword-container">
                <div className="updatePassword-field">
                  <input
                    type="password"
                    // maxlength="26"
                    // data-purpose="edit-profile:name"
                    required="required"
                    onChange={(e) => setPassword(e.target.value)}
                    // value={userinfo.name}
                  />
                  <span>current password</span>
                </div>
                <div className="updatePassword-field">
                  <input
                    type="password"
                    // maxlength="26"
                    // data-purpose="edit-profile:name"
                    required="required"
                    onChange={(e) => setPassword(e.target.value)}
                    // value={userinfo.name}
                  />
                  <span>new password</span>
                </div>
              </div>
              <Button1
                type="submit"
                className="btns"
                buttonStyle="btn--primary--logsign"
                buttonSize="btn--large"
                buttonTrans="btn--logsign"
              >
                Save Changes
              </Button1>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default EditSecurity;
