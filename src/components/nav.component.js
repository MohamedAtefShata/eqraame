import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component{

  render() {
    return (
      <nav >
        <Link to="/" >myweb site</Link>
        <div >
        <ul >
          <li >
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}