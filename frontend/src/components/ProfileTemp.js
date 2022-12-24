import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { Button } from "./Button";
import "./Styles/ProfileTemp.css";

function ProfileTemp() {
  const [userinfo, setuserinfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    PostService.getuserinfo().then(
      (response) => {
        console.log(response);
        setuserinfo(response.data.user);
      },
      (error) => {
        console.log("Private page", error.response);
        // Invalid token
        if (error.response && error.response.status !== 200) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
  }, []);
  return (
    <>
      <div className="user-container">
        <div className="user-avatar">
          <Avatar src={userinfo.avatar} alt="avatar" />
          <div className="user-name">{userinfo.name}</div>
        </div>
        <ul className="pages-menu">
          <Button
            className="btns"
            buttonStyle="btn--outline--scr"
            buttonSize="btn--large"
            buttonTrans="btn--scr"
            buttonPath="/user/edit-profile"
          >
            Profile
          </Button>
          <Button
            className="btns"
            buttonStyle="btn--outline--scr"
            buttonSize="btn--large"
            buttonTrans="btn--scr"
            buttonPath="/user/edit-avatar"
          >
            Photo
          </Button>
          <Button
            className="btns"
            buttonStyle="btn--outline--scr"
            buttonSize="btn--large"
            buttonTrans="btn--scr"
            buttonPath="/user/edit-avatar"
          >
            Account Security
          </Button>
          <Button
            className="btns"
            buttonStyle="btn--outline--scr"
            buttonSize="btn--large"
            buttonTrans="btn--scr"
            buttonPath="/user/edit-avatar"
          >
            My wallet
          </Button>
          <Button
            className="btns"
            buttonStyle="btn--outline--scr"
            buttonSize="btn--large"
            buttonTrans="btn--scr"
            buttonPath="/user/edit-avatar"
          >
            My courses
          </Button>
          <Button
            className="btns"
            buttonStyle="btn--outline--scr"
            buttonSize="btn--large"
            buttonTrans="btn--scr"
            buttonPath="/user/edit-avatar"
          >
            Remove account
          </Button>
        </ul>
      </div>
    </>
  );
}

export default ProfileTemp;
