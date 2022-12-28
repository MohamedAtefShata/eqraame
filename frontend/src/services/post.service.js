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
const chargeWallet = (body) => {
  return axios.get(HOST + "/api/wallet/charge", body, {
    headers: authHeader(),
  });
};
const virtualcreditcard = (body) => {
  return axios.get(HOST + "/virtual/paymentmethod/creditcard", body, {
    headers: authHeader(),
  });
};
const postService = {
  getuserinfo,
  getcourseinfo,
  getcourse,
  getwallet,
  chargeWallet,
  virtualcreditcard,
};
export default postService;
