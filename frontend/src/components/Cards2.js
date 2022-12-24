import React , { useState,useEffect } from 'react';
import CardItem from './CardItem'; /*import card js temp*/
import './Styles/Cards.css'; /*import css style of cards*/
import PostService from "../services/post.service";
import { useNavigate } from "react-router-dom";

function Cards2() {
    var [courses,setcourses] = useState([]);
    // nav to courses page
    // const navigate = useNavigate();
    useEffect(() => {
      PostService.getcourseinfo().then(
        (response) => {
            setcourses(response.data.data);
            console.log(courses);
        },
        (error) => {
          console.log("allcourse", error.response);
        }
      );

    }, []); 
      const list = courses.map((d) => 
        <CardItem 
            src='images/55555555.jpg'
            text={d.name}
            label={d.name}
            path='/Courses'
            rate='4'
            price={d.price}
        /> 
    );
      return (
        <div className='cards'>
          {/* Header of countainer */}
          <h1>Learn what you want from our courses</h1>
          <div className='cards__container'>
            <div className='cards__wrapper'>
            <ul className='cards__items'>
                {list}
                </ul>
            </div>
          </div>
        </div>
      )
}
export default Cards2;