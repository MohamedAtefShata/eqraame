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
        setLessons(response.data.data.lessons);
        console.log(course);
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
  const isAuthor = () => {
    if (user.role === "teacher" && user._id === course.author_id) return true;
    else return false;
  };
  const LessonsList = () => {
    const listLessons = Lessons.map((lesson, index) => (
      <li className="lii">
        <a
          className="aa"
          onClick={() => {
            setLesson(index);
          }}
        >
          {lesson.name}
        </a>
      </li>
    ));
    return listLessons;
  };
  const editLessonsList = () => {
    const listLessons = Lessons.map((lesson, index) => (
      <li className="lii">
        <a
          className="aa"
          onClick={() => {
            setLesson(index);
          }}
        >
          {lesson.name}
        </a>
      </li>
    ));
    return listLessons;
  };

  const Coursecontent = () => {
    if (Lessons[Lesson]) {
      if (Lessons[Lesson].content_type === "article")
        return (
          <div
            className="par"
            dangerouslySetInnerHTML={{ __html: Lessons[Lesson].content }}
          />
        );
      else return <p>other</p>;
    } else {
      console.log("lsa");
    }
  };
  const add = () => {};

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
            <div className="title">Lessons</div>
            <ul className="ul">
              {isAuthor() ? (
                <>
                  <LessonsList />
                  <li className="lii">
                    <a className="aa" onClick={() => add()}>
                      addmore
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <LessonsList />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Mcourse;
