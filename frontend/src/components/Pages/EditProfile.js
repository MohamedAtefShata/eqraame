import React, { useState, useEffect } from "react";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../Styles/App.css";
import "../Styles/EditProfile.css";
import ProfileTemp from "../ProfileTemp";
import { Button1 } from "../Button1";
import "../Styles/loading.css";
import LoadingPage from "./LoadingPage";

function EditProfile() {
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

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <div className="editProfile-container">
        <ProfileTemp />
        <div className="center-handel">
          <div className="profil-Header">
            <h1 className="header">Profile Page</h1>
            <h3 className="disc">Add & edit information about yourself</h3>
          </div>
          <div className="profile-contanier">
            <form>
              <div className="update-container">
                <div className="update-field">
                  <input
                    type="text"
                    maxlength="26"
                    data-purpose="edit-profile:name"
                    required="required"
                    onChange={(e) => setName(e.target.value)}
                    // value={userinfo.name}
                  />
                  <span>name</span>
                </div>
                <div className="update-field">
                  <input
                    type="date"
                    // required="required"
                    onChange={(e) => setBirthdate(e.target.value)}
                    // value={userinfo.birthdate}
                  />
                  <span className="birth-edit">birthdate</span>
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
      </div>
    </>
  );
}

export default EditProfile;
