import axios from "axios";
import authHeader from "./auth-header";
const HOST = "http://localhost:5000";

const getuserinfo = () => {
  return axios.get(HOST + "/api/auth", { headers: authHeader() });
};
const getcourseinfo = () => {
  return axios.get(HOST + "/api/course");
};
const getcourse = (ID) => {
  if (!ID) ID = "63a235ccb38c8720b8130199";
  return axios.get(HOST + "/api/course/" + ID, {
    headers: authHeader(),
  });
};
const getwallet = () => {
  return axios.get(HOST + "/api/wallet", {
    headers: authHeader(),
  });
};
const DEL = () => {
  return axios.delete(HOST + "/api/user", {
    headers: authHeader(),
  });
};
const getTeacherById = (id) => {
  return axios.get(HOST + "/api/user/teacher/" + id);
};
const postService = {
  getuserinfo,
  getcourseinfo,
  getcourse,
  getwallet,
  getTeacherById,
  DEL,
};
export default postService;
