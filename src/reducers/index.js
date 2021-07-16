import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import product from './product';
import cart from "./cart";
import address from './address';
import wishlist from './wishlist';
import order from './order';

export default combineReducers({
  auth,
  message,
  product,
  cart,
  address,
  wishlist,
  order
});
