import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import "./Styles/navbar.css";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AuthService from "../services/auth.service";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
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
  }, []);
  const logOut = () => {
    AuthService.logout();
    navigate("/");
    window.location.reload();
  };
  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src="/images/logoPSDWhite.png" className="logo" alt="" />
          </Link>
          <Toolbar className="searchBar">
            <Search className="searching">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
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
                <Button buttonStyle="btn--outline--nav" onClick={logOut}>
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
