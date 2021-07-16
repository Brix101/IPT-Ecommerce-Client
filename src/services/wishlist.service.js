import axios from "axios";
import {Server} from '../commonServer'

const API_URL = Server+"/wishlist/";

const addToWishlist = async (data) => {
  return await axios.post(API_URL + "add" , data);
};

const getWishlist = async () => {
  return await axios.get(API_URL + "");
};

export default {
    addToWishlist,
    getWishlist
  };