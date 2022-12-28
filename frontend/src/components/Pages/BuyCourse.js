import React from "react";
import BuyComp from "../BuyComp";
import { useParams } from "react-router-dom";

function BuyCourse() {
  let { courseID } = useParams();
  return (
    <>
      <BuyComp courseID={courseID} />
    </>
  );
}

export default BuyCourse;
