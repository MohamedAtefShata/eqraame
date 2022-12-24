import React from "react";
import Avatar from "./Avatar";
import { Button } from "./Button";
import "./Styles/ProfileTemp.css";

function ProfileTemp() {
  return (
    <>
      <div className="user-container">
        <div className="user-avatar">
          <Avatar
            src="https://img.freepik.com/premium-photo/oh-my-god-portrait-astonished-handsome-man-denim-casual-shirt-looking-camera-with-big-amazed-eyes-saying-wow-shocked-by-unbelievable-news-indoor-studio-shot-isolated-yellow-background_416530-21128.jpg?w=2000"
            alt="avatar"
          />
          <div className="user-name">User name</div>
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
