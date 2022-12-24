import Navbar from "./components/Navbar"
import { React,useState, useEffect } from 'react';
import './components/Styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App(){
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        setCurrentUser(user);
      }
    }, []);
    // const logOut = () => {
    //   AuthService.logout();
    // };
    return(
        <>
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' exact element={<Home/>} />
                <Route path='/Courses' element={<Courses />} />
                <Route path='/Categories' element={<Categories />} />
                <Route path='/login' exact element={<Login/>} />
                <Route path='/signup' exact element={<Register/>} />
                <Route path='/user/edit-profile' element={<EditProfile />} />
                <Route path='/user/edit-avatar' element={<EditAvatar />} />
                <Route path='/prof' element={<Prof />} />
            </Routes>
            <Footer/>
        </Router>
        </>
    );
}

export default App;
