import axios from "axios";
import {Server} from '../commonServer'

const API_URL = Server+"/order/";

const getAllOrder = async () => {
  return await axios.get(API_URL + "order");
};

const getProduct = async id => {
//   return await axios.get(API_URL + `${id}`);
};

const create = async (data) => {
  return await axios.post(API_URL + "create", data);
};

const updateStatus = async (id, data) => {
  return await axios.put(API_URL + `${id}`, data);
};

const remove = id => {
  // return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  // return http.delete(`/tutorials`);
};

const findByStatus = async (status) => {
  return await axios.post( API_URL + "status", status);
};

const findBySeller = async (status) => {
  return await axios.post( API_URL + "seller", status);
};

export default {
  getAllOrder,
  getProduct,
  create,
  updateStatus,
  remove,
  findByStatus,
  findBySeller
};
