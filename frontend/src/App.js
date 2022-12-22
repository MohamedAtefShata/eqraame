import Navbar from "./components/Navbar"
import React from 'react';
import './components/Styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";

function App(){
    return(
        <>
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' exact element={<Home/>} />
                <Route path='/login' exact element={<Login/>} />
                <Route path='/signup' exact element={<Register/>} />
            </Routes>
        </Router>
        </>
    );
}

export default App;