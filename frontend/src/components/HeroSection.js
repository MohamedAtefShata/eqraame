import { Button } from './Button';
import React from 'react';
import '../App.css';
import './HeroSection.css';

function HeroSection() {
  return (
    <>
    <div className='hero-container'>
      <img src='./images/HeroS.png' className='slognimg' alt=''/>
      <div className='hero-slogan'>
        <h1 className='hero-title'>science have no limits</h1>
          <div className='hero-btn'>
          <Button 
          className='btns' 
          buttonStyle='btn--outline'
          buttonSize='btn--large'> 
          join as teacher
          </Button>
          <Button 
          className='btns' 
          buttonStyle='btn--primary'
          buttonSize='btn--large'> 
          join as student
          </Button>
          </div>
      </div>
    </div>
    </>
  )
}

export default HeroSection;