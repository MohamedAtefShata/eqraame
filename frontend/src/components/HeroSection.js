import { Button } from './Button';
import React from 'react';
import '../App.css';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <img src='./images/HeroS.png' className='slognimg' alt=''/>
      <h1>science have no limits</h1>
      <div className='hero-btns'>
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
  )
}

export default HeroSection;