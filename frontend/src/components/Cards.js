/**
 * Cards info
 * @author Aboelyazeed
 * @description take course cards info like (img-src, text, path, price, rate)
 */

import React from 'react';
import CardItem from './CardItem'; /*import card js temp*/
import './Styles/Cards.css'; /*import css style of cards*/

function Cards() {
  return (
    <div className='cards'>
      {/* Header of countainer */}
      <h1>Learn what you want from our courses</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
            <ul className='cards__items'>
               {/* Here cards info like you see */}
                <CardItem 
                src='images/55555555.jpg'
                text='C++ Programming Course'
                label='Programming'
                path='/C++'
                rate='4'
                price='239$'
                />
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards;
