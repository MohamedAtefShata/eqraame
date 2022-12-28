import Navbar from "./components/Navbar";
import { React, useState, useEffect } from "react";
import "./components/Styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Courses from "./components/Pages/Courses";
import Categories from "./components/Pages/Categories";
import Footer from "./components/Footer";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import EditAvatar from "./components/Pages/EditAvatar";
import EditProfile from "./components/Pages/EditProfile";
import AuthService from "./services/auth.service";
import Allcourses from "./components/Pages/Allcourses";
import EditSecurity from "./components/Pages/EditSecurity";
import RemoveAccount from "./components/Pages/RemoveAccount";
import Pay from "./components/Pages/Pay";
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Categories" element={<Categories />} />
          <Route
            path="/login"
            exact
            element={currentUser ? <Home /> : <Login />}
          />
          <Route
            path="/signup"
            exact
            element={currentUser ? <Home /> : <Register />}
          />
          <Route
            path="/user/edit-profile"
            element={currentUser ? <EditProfile /> : <Login />}
          />
          <Route
            path="/user/edit-avatar"
            element={currentUser ? <EditAvatar /> : <Login />}
          />
          <Route
            path="/user/edit-account"
            element={currentUser ? <EditSecurity /> : <Login />}
          />
          <Route
            path="/user/remove-account"
            element={currentUser ? <RemoveAccount /> : <Login />}
          />
          <Route path="/all-courses" element={<Allcourses />} />
          <Route path="/charging" element={currentUser ? <Pay /> : <Login />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
