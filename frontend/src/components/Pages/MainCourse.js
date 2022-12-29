import "../Styles/App.css";
import React from "react";
import { useParams } from "react-router-dom";
import Mcourse from "../courseview/Mcourse";

function MainCourse() {
  let { courseID } = useParams();
  return (
    <>
      <Mcourse courseID={courseID} />
    </>
  );
}
export default MainCourse;
