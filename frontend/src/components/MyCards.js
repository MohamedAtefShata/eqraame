import React, { useState, useEffect, useParams } from "react";
import CardItem from "./CardItem"; /*import card js temp*/
import "./Styles/Cards.css"; /*import css style of cards*/
import PostService from "../services/post.service";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./Pages/LoadingPage";
import postService from "../services/post.service";

function MyCards() {
  var [mycourses, setmycourses] = useState([]);
  const [mycoursesData, setmycoursesData] = useState([]);
  //   const [loading, setloading] = useState(true);

  // nav to courses page
  // const navigate = useNavigate();
  useEffect(() => {
    // setloading(true);
    PostService.getwallet().then(
      (response) => {
        // setloading(false);
        setmycourses(response.courses);
        console.log(mycourses);
      },
      (error) => {
        // setloading(false);
        console.log("allcourse", error.response);
      }
    );
    setmycoursesData(mycourses);
    mycourses.map((d, index) => {
      mycoursesData[index] = postService.getcourse(d);
    });
  }, []);

  const list = mycoursesData.map((d) => (
    <CardItem
      src="/images/55555555.jpg"
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

  return (
    <div className="cards">
      {/* Header of countainer */}
      {/* <h1></h1> */}
      <div className="cards__container">
        {!mycoursesData.length ? notAvilable : listView}
      </div>
    </div>
  );
}
export default MyCards;
