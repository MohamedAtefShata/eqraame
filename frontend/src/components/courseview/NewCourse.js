import React, { useState, useEffect, useParams } from "react";
import { Button1 } from "../Button1";
import { useNavigate } from "react-router-dom";
import postService from "../../services/post.service";
import "../Styles/MainCourse.css";
import LoadingPage from "../Pages/LoadingPage";
import axios from "axios";

function NewCourse(props) {
  const [user, setUser] = useState([]);
  const [loading, setloading] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [previewSource, setPreviewSource] = useState("/images/55555555.jpg");
  const [descreption, setDescription] = useState();
  const navigate = useNavigate();

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      console.log(reader.result);
    };
  };
  const sendImage = async () => {
    try {
      //   const response = await axios.post(
      //     "http://localhost:5000/api/user/updateavatar",
      //     { avatar: previewSource },
      //     { headers: authHeader() }
      //   );
      //   console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const dataUpdate = async () => {
    setloading(true);
    let res1 = await postService.getuserinfo();
    setUser(res1.data.user);
    setloading(false);

    // updateDisable(user, res2.data.data);
  };

  useEffect(() => {
    dataUpdate();
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <div className="row">
        <div className="container mycourse">
          <h1>Create new Course</h1>
          <div className="content">
            <div className="addimage">
              <img src={previewSource} alt="preview" />
              <p />
              <div>
                <label for="inputTag" className="filechoserlabel">
                  Select Image <br />
                  <i class="fa fa-2x fa-solid fa-2x fa-image"></i>
                  <input
                    id="inputTag"
                    accept="/image/*"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.type.substring(0, 5) === "image") {
                        setImage(file);
                        console.log(file);
                        previewImage(file);
                        // sendImage();
                      } else {
                        setImage("");
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="input-field">
              <input
                type="text"
                required="required"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span>Name</span>
            </div>
            <br />
            <h3>Category:</h3>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Development</option>
              <option>Marketing</option>
              <option>Science</option>
              <option>Design</option>
            </select>

            <div>
              <h3>Description :</h3>
              <textarea
                className="description"
                value={descreption}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <Button1
              className=""
              buttonStyle="btn--primary--logsign"
              buttonSize="btn--large"
              buttonTrans="btn--logsign"
            >
              add
            </Button1>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewCourse;
