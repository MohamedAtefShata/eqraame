import React from 'react';
import { Button } from "./Button";

function ProfileTemp() {
  return (
    <>
    <div className='user-contant'>
      <div className='user-container'>
        <div className='user-avatar'>
          <img src='/' alt='' className='' />
        </div>
        <div className='user-name'>User name</div>
        <ul className='pages-menu'>
        <Button 
          className='btns' 
          buttonStyle='btn--outline--scr'
          buttonSize='btn--large'
          buttonTrans='btn--scr'
          buttonPath='/user/edit-profile'>
          Profile
          </Button>
          <Button 
          className='btns' 
          buttonStyle='btn--outline--scr'
          buttonSize='btn--large'
          buttonTrans='btn--scr'
          buttonPath='/user/edit-avatar'>
          Avatar
          </Button>
          </ul>
      </div>
    </div>
    </>
  );
}

export default ProfileTemp;
