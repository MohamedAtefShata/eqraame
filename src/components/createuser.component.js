import React, { Component } from 'react';

export default class CreateUser extends Component {
// axios and react state
  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form >
          <div > 
            <label>Username: </label>
            <input  type="text" required className="form-control"/>
          </div>
          <div >
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}