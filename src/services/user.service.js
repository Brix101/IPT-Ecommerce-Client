import axios from "axios";
import authHeader from "./auth-header";
import {Server} from '../commonServer'

const API_URL = Server+"/user-access/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getSellerBoard = () => {
  return axios.get(API_URL + "seller", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getSellerBoard,
  getAdminBoard,
};