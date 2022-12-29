import axios from "axios";
import authHeader from "./auth-header";
const HOST = "http://localhost:5000";
//add
const signup = (name, email, password, birthdate, role) => {
  return axios
    .post(HOST + "/api/user/register", {
      name,
      email,
      password,
      ["confirm-password"]: password,
      birthdate,
      role: role.toLowerCase(),
      avatar: "default",
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", response.data.token);
      }
      return response.data.token;
    });
};

const login = (email, password) => {
  return axios
    .post(HOST + "/api/auth", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", response.data.token);
      }
      return response.data.token;
    });
};

const addlesson = (ID, body) => {
  return axios.post(HOST + "/api/course/" + ID + "/lesson", body, {
    headers: authHeader(),
  });
};
const updatelesson = (cID, lID, body) => {
  return axios.post(HOST + "/api/course/" + cID + "/lesson/" + lID, body, {
    headers: authHeader(),
  });
};
const deletelesson = (cID, lID) => {
  return axios.delete(
    HOST + "/api/course/" + cID + "/lesson/" + lID,

    {
      headers: authHeader(),
    }
  );
};
const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return localStorage.getItem("user");
};
const chargeWallet = (body) => {
  return axios.post(HOST + "/api/wallet/charge", body, {
    headers: authHeader(),
  });
};
const virtualcreditcard = (body) => {
  return axios.post(HOST + "/virtual/paymentmethod/creditcard", body, {
    headers: authHeader(),
  });
};
const addCourse = (name, price, descreption, category, cover) => {
  return axios.post(
    HOST + "/api/course/",
    {
      name: name,
      price: price,
      descreption: descreption,
      category: category,
      cover: cover,
    },
    {
      headers: authHeader(),
    }
  );
};
const payCourse = (ID) => {
  return axios.post(
    HOST + "/api/wallet/pay/course/" + ID,
    {},
    {
      headers: authHeader(),
    }
  );
};
const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  addlesson,
  updatelesson,
  deletelesson,
  chargeWallet,
  virtualcreditcard,
  payCourse,
};

export default authService;
