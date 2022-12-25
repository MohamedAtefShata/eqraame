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
import Prof from "./components/Pages/Prof";
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
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Register />} />
          <Route path="/user/edit-profile" element={<EditProfile />} />
          <Route path="/user/edit-avatar" element={<EditAvatar />} />
          <Route path="/user/edit-account" element={<EditSecurity />} />
          <Route path="/user/remove-account" element={<RemoveAccount />} />
          <Route path="/prof" element={<Prof />} />
          <Route path="/allcourses" element={<Allcourses />} />
          <Route path="/pay" element={currentUser ? <Pay /> : <Login />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
