import React, { useState, useEffect, useParams } from "react";
import { Button1 } from "../Button1";
import { Link, useNavigate } from "react-router-dom";
import postService from "../../services/post.service";
import AuthService from "../../services/post.service";
import "../Styles/MainCourse.css";
import LessonView from "./LessonView";
import LoadingPage from "../Pages/LoadingPage";
import authService from "../../services/auth.service";

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function Mcourse(props) {
  const [user, setUser] = useState([]);
  const [course, setCourse] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [author, setAuthor] = useState([]);
  const [overview, setOverView] = useState({});
  const { courseID } = props;
  const [disable, setDisable] = useState(true);
  const [loading, setloading] = useState();

  const isAuthor = () => {
    if (user.role === "teacher" && user._id === course.author_id) return true;
    else return false;
  };

  const navigate = useNavigate();
  let { hash } = window.location;
  hash = hash ? hash.replace("#", "") : "0";
  let lessonIndex = isNumeric(hash) ? parseInt(hash) : 0;
  if (isAuthor())
    lessonIndex =
      lessonIndex > lessons.length + 1 || lessonIndex < 0 ? 0 : lessonIndex;
  else
    lessonIndex =
      lessonIndex > lessons.length || lessonIndex < 0 ? 0 : lessonIndex;

  if (disable) lessonIndex = 0;

  const updateOverView = (course) => {
    setOverView({
      name: "OverView",
      content_type: "article",
      content: `
      <div class="text-center ">  
        <img class="course-cover text-center" src="/images/55555555.jpg"/>
        <div><span style='color:#d49b00; font-size:20px ;font-weight: bolder';>Course name : </span>  ${course.name} </div>
        <p/>
        <hr>
        <span style='color:#d49b00; font-size:18px ;font-weight: bolder';>Author: </span> ${author}
        <p/>
        <span style='color:#d49b00; font-size:18px ; font-weight: bolder';>Category: </span> ${course.category}
        <hr/>
        <h4 style="color:#d49b00;font-size:18px ; font-weight: bolder';font-size:72";>description:</h4>
        <p>${course.descreption}</p>
        </div>
      `,
    });
  };

  // const updateDisable = () => {
  //   console.log("Fuck".repeat(55));
  //   console.log(user);
  //   console.log(course);
  //   console.log("Fuck".repeat(55));
  //   // if (user.role === "teacher" && user._id === course.author_id)
  //   //   setDisable(false);
  // };

  const deleteLesson = (lid) => {
    console.log("delete");
    authService.deletelesson(courseID, lid).then(
      (res) => {
        window.location.reload();
        console.log(res);
      },
      (error) => console.log(error)
    );
  };

  const dataUpdate = async () => {
    setloading(true);
    let res1 = await postService.getuserinfo();

    setUser(res1.data.user);
    // updateDisable(res1.data.user, course);
    let res2 = await postService.getcourse(courseID);
    setloading(false);
    setCourse(res2.data.data);
    setLessons(res2.data.data.lessons);
    updateOverView(res2.data.data);

    let user0 = res1.data.user;
    let course0 = res2.data.data;

    let res3 = await postService.getwallet();
    let mycourses = res3.data.wallet.courses;
    mycourses.forEach((e) => {
      if (courseID === e) setDisable(false);
    });

    if (user0.role === "teacher" && user0._id === course0.author_id) {
      setDisable(false);
    }
    // updateDisable(user, res2.data.data);
  };

  useEffect(() => {
    dataUpdate();
  }, []);

  const LessonsList = () => {
    const listLessons = lessons.map((lesson, index) => (
      <li className="lii">
        <div
          className={
            "side--btn " +
            (lessonIndex === index + 1 ? "selected" : "") +
            (disable ? " disable" : "")
          }
        >
          <a href={"#" + (index + 1)}>{index + 1 + ". " + lesson.name}</a>
          {isAuthor() ? (
            <span
              className="delete--btn"
              onClick={(e) => deleteLesson(lesson._id)}
            >
              {" "}
              <i class="fa fa-sharp fa-solid fa-trash"></i>{" "}
            </span>
          ) : (
            ""
          )}

          {disable ? <i class="fa fa-solid fa-lock"></i> : ""}
        </div>
      </li>
    ));
    return listLessons;
  };

  const add = () => {};

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <div className="row">
        <div className="lesson">
          <div className="container">
            <div className="course--controll--section">
              <div>
                {" "}
                {lessonIndex >= lessons.length ? (
                  ""
                ) : (
                  <Button1
                    className="controll-btn"
                    buttonStyle="btn--primary--logsign"
                    buttonSize="btn--large"
                    buttonTrans="btn--logsign"
                    onClick={() => {
                      navigate(`#${lessonIndex + 1}`);
                    }}
                  >
                    Next
                  </Button1>
                )}
              </div>
              <div>
                {" "}
                {lessonIndex <= 0 ? (
                  ""
                ) : (
                  <Button1
                    className="controll-btn"
                    buttonStyle="btn--primary--logsign"
                    buttonSize="btn--large"
                    buttonTrans="btn--logsign"
                    onClick={() => {
                      navigate(`#${lessonIndex - 1}`);
                    }}
                  >
                    Prev
                  </Button1>
                )}
              </div>
            </div>
            <LessonView
              lesson={
                lessonIndex === 0
                  ? overview
                  : lessonIndex > lessons.length
                  ? { name: "", content: "", content_type: "article" }
                  : lessons[lessonIndex - 1]
              }
              edit={lessonIndex !== 0 && isAuthor()}
              course_id={courseID}
            />
          </div>
        </div>
        <div className="list">
          <div className="container">
            <a
              className={
                "side--btn text-center " + (lessonIndex === 0 ? "selected" : "")
              }
              href="#overview"
            >
              Coure Overview
            </a>
            <div className="title">Lessons</div>
            <ul className="ul">
              {isAuthor() ? (
                <>
                  <LessonsList />
                  <li className="lii">
                    <a
                      className={
                        "side--btn " +
                        (lessonIndex === lessons.length + 1 ? "selected" : "")
                      }
                      href={"#" + (lessons.length + 1)}
                    >
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
