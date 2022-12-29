import "../Styles/App.css";
import ProfileTemp from "../ProfileTemp";
import React, { useState, useEffect } from "react";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../Styles/EditAvatar.css";
import { Button1 } from "../Button1";
import "../Styles/loading.css";
import axios from "axios";
import authHeader from "../../services/auth-header";

function EditAvatar() {
  const [userinfo, setuserinfo] = useState([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      console.log(reader.result);
    };
  };
  const sendImage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/updateavatar",
        { avatar: previewSource },
        { headers: authHeader() }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
                  <dialog></dialog>
                  <input
                    type="file"
                    required="required"
                    accept="/image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.type.substring(0, 5) === "image") {
                        setImage(file);
                        previewImage(file);
                        // sendImage();
                      } else {
                        setImage(
                          "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"
                        );
                      }
                    }}
                  />
                  <span>upload photo</span>
                </div>
              </div>
              <Button1
                type="submit"
                onClick={async (e) => {
                  setloading(true);
                  await sendImage();
                  setloading(false);
                  console.log("saved");
                }}
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

export default EditAvatar;
