import axios from "axios";
import {Server} from '../commonServer'

const API_URL = Server+"/address/";

const addAddress = async (address) => {
    return await axios.post(API_URL + "add", address);
  };
  
const getAddress = async () => {
  return await axios.get(API_URL + "");
};

const getOneAddress = async (id) => {
  return await axios.get(API_URL + `${id}`);
};

const updateAddress = async (id, data) => {
  return await axios.put(API_URL + `${id}`, data);
};

const removeAddress = async (id) => {
  return await axios.delete(API_URL + `${id}`);
};

export default {
  addAddress,
  getAddress,
  updateAddress,
  removeAddress,
  getOneAddress
};
