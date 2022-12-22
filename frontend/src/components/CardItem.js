import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

function CardItem(props) {
    const [value] = React.useState(props.rate);
    return (
    <>
        <li className='cards__item'>
            <Link className='cards__item__link' to={props.path}>
                <figure className='cards__item__pic-wrap' data-category={props.label}>
                    <img src={props.src}
                    alt='Course_image'
                    className='cards__item__img'
                    />
                </figure>
                <div className='cards__item__info'>
                    <h5 className='cards__item__text'>{props.text}</h5>
                    <Rating className='cards__item__rating' name="read-only" value={value} readOnly />
                    <h3 className='cards__item__price'>{props.price}</h3>
                </div>
            </Link>
        </li>
    </>
  )
}

export default CardItem;