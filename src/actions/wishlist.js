import {
    RETRIEVE_WISHLIST,
    SET_MESSAGE
  } from "./types";
  
  import wishlistService from "../services/wishlist.service";

  export const addToWishlist = (data) => (dispatch) => {
    return wishlistService.addToWishlist(data)
    .then((response) => {
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
    
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

export const getWishlist = () => (dispatch) => {
  return wishlistService.getWishlist()
  .then((response) => {

      dispatch({
        type: RETRIEVE_WISHLIST,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};