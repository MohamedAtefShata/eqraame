import Navbar from "./components/Navbar"
import React from 'react';
import './components/Styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Pages/Home";
import Courses from "./components/Pages/Courses";
import Categories from "./components/Pages/Categories";
import Footer from "./components/Footer";

function App(){
    return(
        <>
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' exact element={<Home/>} />
                <Route path='/Courses' element={<Courses />} />
                <Route path='/Categories' element={<Categories />} />
            </Routes>
            <Footer/>
        </Router>
        </>
    );
}

export default App;