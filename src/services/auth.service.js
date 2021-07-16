import axios from "axios";
import {Server} from '../commonServer'

const API_URL = Server+"/auth/";

const register = async (firstname,lastname, email, password,repeatpass) => {
  return await axios.post(API_URL + "signup", {
    firstname,
    lastname,
    email,
    password,
    repeatpass
  });
};

const login = async(email, password) => {
  return await axios.post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  axios.get(API_URL + "logout");
  localStorage.removeItem("user");
};

const loggedIn = async () => {
  await axios.get(API_URL + "loggedIn")
  .then((response) => {
    if (response.data === false) {
      logout();
    }
  })
};

const changePassword = async (data) => {
  return await axios.post(API_URL + "changepassword", data)
};

export default {
  register,
  login,
  logout,
  loggedIn,
  changePassword
};
