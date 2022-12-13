import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Nav from "./components/nav.component"
import home from "./components/home.component";
import CreateUser from "./components/createuser.component.js";

function App() {
  return (
    <Router>
      <div className="container">
      <Nav />
      <br/>
      <Route path="/" exact component={home} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
