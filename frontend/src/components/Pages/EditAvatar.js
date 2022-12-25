import "../Styles/App.css";
import ProfileTemp from "../ProfileTemp";
import React, { useState, useEffect } from "react";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../Styles/EditAvatar.css";
import { Button1 } from "../Button1";
import "../Styles/loading.css";

function EditAvatar() {
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
      <div className="EditAvatar-container">
        <ProfileTemp />
        <div className="center-handel">
          <div className="profil-Header">
            <h1 className="header">Profile photo</h1>
            <h3 className="disc">Add & edit your personal photo</h3>
          </div>
          <div className="avatar-contanier">
            <form>
              <div className="updateAvatar-container">
                <div className="updateAvatar-field">
                  <input
                    type="file"
                    // maxlength="26"
                    // data-purpose="edit-profile:name"
                    required="required"
                    onChange={(e) => setName(e.target.value)}
                    // value={userinfo.name}
                  />
                  <span>name</span>
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

export default EditAvatar;
