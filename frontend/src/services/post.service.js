import axios from "axios";
import authHeader from "./auth-header";

const getuserinfo = () => {
  return axios.get("http://localhost:5000/api/auth",{ headers: authHeader()});
};

const postService = {
    getuserinfo,
};
export default postService;