import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import "./Styles/loading.css";
import "./Styles/MyCoursesComp.css";
import ProfileTemp from "./ProfileTemp";
import Cards from "./Cards";

function MyCoursesComp() {
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
      <div className="mycourses-container">
        <ProfileTemp />
        <div className="center-handel">
          <div className="courses-Header">
            <h1 className="header">My Courses</h1>
            <h3 className="courses-disc">Courses that you have 🍆</h3>
          </div>
          <div className="courses-contanier">
            <div className="courses-wapper">
              <img src="/images/books.png" alt="" className="wallt-img" />
              <p className="courses-balance">
                <b className="balance">{"Your Courses: "}</b>
              </p>
            </div>
            {/* <Cards /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCoursesComp;
