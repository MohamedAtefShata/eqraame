import React, { useState, useEffect } from "react";
import { Button1 } from "./Button1";
import { Link, useNavigate } from "react-router-dom";
import postService from "../services/post.service";
import "./Styles/MainCourse.css";

function Mcourse() {
  const [user, setUser] = useState([]);
  const [course, setCourse] = useState([]);
  const [Lessons, setLessons] = useState([]);
  const [Lesson, setLesson] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    postService.getuserinfo().then(
      (response) => {
        setUser(response.data.user);
      },
      (error) => {
        // Invalid token
        if (error.response && error.response.status !== 200) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
    postService.getcourse().then(
      (response) => {
        setCourse(response.data.data);
        console.log(course);
        setLessons(response.data.data.lessons);
      },
      (error) => {
        // Invalid request
        if (error.response && error.response.status !== 200) {
          navigate("/");
          window.location.reload();
        }
      }
    );
  }, []);
  const isteacher = () => {
    if (user.role === "student") return false;
    else return true;
  };
  const setandupdate = (i) => {
    setLesson(i);
    // window.location.reload();
  };
  const LessonsList = () => {
    var i = 0;
    const listLessons = Lessons.map((lesson, index) => (
      <li>
        <Button1
          className="listbtn"
          onClick={() => {
            setLesson(index);
          }}
        >
          {lesson.name}
        </Button1>
      </li>
    ));
    return <ul>{listLessons}</ul>;
  };
  const Coursecontent = () => {
    if (Lessons[Lesson]) {
      if (Lessons[Lesson].content_type === "article")
        return <p className="par">{Lessons[Lesson].content}</p>;
      else return <p>other</p>;
    } else {
      console.log("lsa");
    }
  };

  return (
    <>
      <div className="row">
        <div className="lesson">
          <div className="container">
            <Button1
              className="btns"
              buttonStyle="btn--primary--logsign"
              buttonSize="btn--large"
              buttonTrans="btn--logsign"
              onClick={() => setLesson(Lesson + 1)}
            >
              Next
            </Button1>
            <h1>{Lessons[Lesson] ? Lessons[Lesson].name : "dd"}</h1>
            <Coursecontent />
          </div>
        </div>
        <div className="list">
          <div className="container">
            <h4>Lessons</h4>
            <LessonsList />
          </div>
        </div>
      </div>
    </>
  );
}
export default Mcourse;
