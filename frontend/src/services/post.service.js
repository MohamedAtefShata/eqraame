import axios from "axios";
import authHeader from "./auth-header";

const getuserinfo = () => {
  return axios.get("http://localhost:5000/api/auth", { headers: authHeader() });
};
const getcourseinfo = () => {
  return axios.get("http://localhost:5000/api/course");
};
const getcourse = () => {
  return axios.get("http://localhost:5000/api/course/63a235ccb38c8720b8130199");
};
const postService = {
  getuserinfo,
  getcourseinfo,
  getcourse,
};
export default postService;
