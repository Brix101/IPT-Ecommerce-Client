import axios from "axios";
import {Server} from '../commonServer'

const API_URL = Server+"/cart/";



// const get = id => {
//   // return http.get(`/tutorials/${id}`);
// };

const addToCart = async (product) => {
  return await axios.post(API_URL + "add", product);
};

const updateQuantity = async (product) => {
  return await axios.post(API_URL + "updatequantity", product);
};

const getCart = async () => {
  return await axios.get(API_URL + "");
};

const getChecked = async () => {
  return await axios.get(API_URL + "checked");
};


const removeItem = (id) => {
  return axios.delete(API_URL +`${id}`);
};

const isChecked = async (product) => {
  return await axios.post(API_URL + "checked", product);
};

const update = (id, data) => {
  // return http.put(`/tutorials/${id}`, data);
};

const removeAll = () => {
  // return http.delete(`/tutorials`);
};

const findByTitle = title => {
  // return http.get(`/tutorials?title=${title}`);
};

export default {
  addToCart,
  getCart,
  removeItem,
  updateQuantity,
  isChecked,
  getChecked
};
