import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Proff = () => {
  const [userinfo, setuserinfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    PostService.getuserinfo().then(
      (response) => {
        console.log(response);
        setuserinfo(response.data.user);
      },
      (error) => {
        console.log("Private page", error.response);
        // Invalid token
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
  }, []);

  return (
    <div>
      <h3>{userinfo.name}</h3>
      <h3>{userinfo.avatar}</h3>
      <h3>{userinfo.birthdate}</h3>
      <h3>{userinfo.role}</h3>
    </div>
  );
};

export default Proff;