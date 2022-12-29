import React, { useState, useEffect, useParams } from "react";
import CardItem from "./CardItem"; /*import card js temp*/
import "./Styles/Cards.css"; /*import css style of cards*/
import PostService from "../services/post.service";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./Pages/LoadingPage";

function Cards() {
  const [courses, setcourses] = useState([]);
  const [loading, setloading] = useState(true);

  // nav to courses page
  // const navigate = useNavigate();
  useEffect(() => {
    setloading(true);
    PostService.getcourseinfo().then(
      (response) => {
        setloading(false);
        setcourses(response.data.data);
        console.log(courses);
      },
      (error) => {
        setloading(false);
        console.log("allcourse", error.response);
      }
    );
  }, []);

  const list = courses.map((d) => (
    <CardItem
      src={d.cover}
      text={d.name}
      label={d.category}
      path={"/course/" + d._id}
      rate="4"
      price={d.price + "$"}
    />
  ));

  const notAvilable = (
    <h1 className="not--avilable--label">
      OPS!😥
      <br /> No courses available
    </h1>
  );

  const listView = (
    <div className="cards__wrapper">
      <ul className="cards__items">{list}</ul>
    </div>
  );

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="cards">
      {/* Header of countainer */}
      <h1>Learn what you want from our courses</h1>
      <div className="cards__container">
        {!courses.length ? notAvilable : listView}
      </div>
    </div>
  );
}
export default Cards;
