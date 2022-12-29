import { useEffect, useState } from "react";
import { Button1 } from "../Button1";
import "../Styles/MainCourse.css";
import AuthServies from "../../services/auth.service";
import LoadingPage from "../Pages/LoadingPage";
const LessonView = (props) => {
  const { lesson, edit, course_id } = props;
  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [content_type, setContentType] = useState();
  const [loading, setloading] = useState();

  useEffect(() => {
    setName(lesson.name);
    setContent(lesson.content);
    setContentType(lesson.content_type);
  }, [lesson]);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "content") setContent(value);
  };

  if (loading) return <LoadingPage />;

  if (edit) {
    return (
      <div className="edit text-center">
        <input
          name="name"
          value={name}
          type="text"
          onChange={onChangeInput}
          placeholder="Type Name"
        />
        <p />
        <select name="content_type" value={content_type}>
          <option value="article">article</option>
          <option value="video">video</option>
        </select>
        <p />
        <textarea
          className="content"
          name="content"
          value={content}
          onChange={onChangeInput}
        ></textarea>
        <br />
        <Button1
          buttonStyle="btn--primary--logsign"
          buttonSize="btn--large"
          buttonTrans="btn--logsign"
          onClick={(e) => {
            setloading(true);
            if (lesson._id) {
              AuthServies.updatelesson(course_id, lesson._id, {
                name,
                content,
                content_type,
              }).then(
                (response) => setloading(false),
                (error) => setloading(false)
              );
            } else {
              AuthServies.addlesson(course_id, {
                name,
                content,
                content_type,
              }).then(
                (response) => {
                  setloading(false);
                  window.location.reload();
                },
                (error) => setloading(false)
              );
            }
          }}
        >
          Save Changes
        </Button1>
      </div>
    );
  }

  if (content_type === "article")
    return (
      <div>
        <h1>{name}</h1>
        <div
          className="par"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    );
  else
    return (
      <div className="text-center">
        <h1>{name}</h1>
        <video src={content} width="750" height="500" controls>
          {/* <source src={content} type="video/mp4" /> */}
        </video>
      </div>
    );
};

export default LessonView;
