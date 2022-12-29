import React, { useState, useEffect, styles } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import "./Styles/navbar.css";
import Toolbar from "@mui/material/Toolbar";
import AuthService from "../services/auth.service";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import postService from "../services/post.service";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [courses, setcourses] = useState([]);
  var [currentUser, setCurrentUser] = useState(undefined);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate();

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    postService.getcourseinfo().then(
      (response) => {
        setcourses(response.data.data);
        console.log(response.data.data);
      },
      (error) => {
        console.log("allcourse", error.response);
      }
    );
  }, []);
  const logOut = () => {
    AuthService.logout();
    navigate("/");
    window.location.reload();
  };
  window.addEventListener("resize", showButton);
  const dd = courses.map((d) => d.name);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src="/images/logoPSDWhite.png" className="logo" alt="" />
          </Link>
          <Toolbar className="searchBar">
            <Autocomplete
              disablePortal
              freeSolo
              id="free-solo-demo"
              onChange={(event, value) => {
                courses.map((d) => {
                  d.name === value
                    ? navigate("/course/" + d._id)
                    : console.log("d");
                });
              }}
              sx={{ width: 300 }}
              options={dd}
              renderInput={(params) => (
                <TextField
                  sx={{
                    input: {
                      color: "white",
                    },
                  }}
                  {...params}
                  label="Search"
                />
              )}
            />
          </Toolbar>
        </div>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link
                  to="/courses"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  NEW COURSES
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/categories"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  CATEGORIES
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/user/my-courses"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  MY COURSES
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/user/my-wallet"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  MY WALLET
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/user/edit-profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  PROFILE
                </Link>
              </li>
              {button && (
                <Button
                  buttonStyle="btn--outline--nav"
                  buttonSize="btn--small"
                  onClick={logOut}
                >
                  LOG OUT
                </Button>
              )}
              <li className="nav-item">
                <Link
                  className="nav-links-mobile"
                  onClick={() => {
                    closeMobileMenu();
                    logOut();
                  }}
                >
                  LOG OUT
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  to="/courses"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  NEW COURSES
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/categories"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  CATEGORIES
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  LOG IN
                </Link>
              </li>
              {button && (
                <Button buttonStyle="btn--outline--nav" buttonPath="/signup">
                  SIGN UP
                </Button>
              )}
              <li className="nav-item">
                <Link
                  to="/signup"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  SIGN UP
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
export default Navbar;
