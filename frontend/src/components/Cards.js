import React from 'react'
import CardItem from './CardItem';
import './Cards.css'

function Cards() {
  return (
    <div className='cards'>
      <h1>Learn what you want from our courses</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
            <ul className='cards__items'>
                <CardItem 
                src='images/55555555.jpg'
                text='test text working or not'
                label='Programming'
                path='/login'
                />
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards;
