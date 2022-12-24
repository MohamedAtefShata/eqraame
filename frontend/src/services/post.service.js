import axios from "axios";
import authHeader from "./auth-header";

const getuserinfo = () => {
  return axios.get("http://localhost:5000/api/auth",{ headers: authHeader()});
};
const getcourseinfo = () => {
  return axios.get("http://localhost:5000/api/course");
};

const postService = {
    getuserinfo,
    getcourseinfo
};
export default postService;