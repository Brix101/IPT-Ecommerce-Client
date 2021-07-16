import axios from "axios";
import {Server} from '../commonServer'

const API_URL = Server+"/product/";

const getAll = async () => {
  return await axios.get(API_URL + "products");
};

const getProduct = async id => {
  return await axios.get(API_URL + `${id}`);
};

const create = async (data) => {
  return await axios.post(API_URL + "create", data);
};

const update = (id, data) => {
  // return http.put(`/tutorials/${id}`, data);
};

const remove = id => {
  // return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  // return http.delete(`/tutorials`);
};

const findByName = async (name) => {
  return await axios.get( API_URL + `products?name=${name}`);
};

export default {
  getAll,
  getProduct,
  create,
  update,
  remove,
  findByName
};
