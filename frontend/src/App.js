import Navbar from "./components/Navbar"
import React from 'react';
import './components/Styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Pages/Home";
import Courses from "./components/Pages/Courses";
import Categories from "./components/Pages/Categories";
import Footer from "./components/Footer";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";

function App(){
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
            </Routes>
            <Footer/>
        </Router>
        </>
    );
}

export default App;