import {
    ADD_TO_CART,
    RETRIEVE_CART,
    UPDATE_CART,
    DELETE_CART,

    SET_MESSAGE
  } from "./types";
  
  import cartService from "../services/cart.service";

  export const addToCart = (product) => (dispatch) => {
    return cartService.addToCart(product).then(
      (response) => {
        dispatch({
          type: ADD_TO_CART,
          payload: response.data,
        });
  
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

  export const updateQuantity = (product) => (dispatch) => {
    return cartService.updateQuantity(product).then(
      () => {
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

  export const isChecked = (product) => async (dispatch) => {
    return cartService.isChecked(product).then(
      () => {
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
  
  export const getCart = () => async (dispatch) => {
    try {
      const res = await cartService.getCart();
  
      dispatch({
        type: RETRIEVE_CART,
        payload: res.data,
      });

      return Promise.resolve();
    } catch (err) {
      console.log(err);
    }
  };

  export const getChecked = () => async (dispatch) => {
    try {
      const res = await cartService.getChecked();
  
      dispatch({
        type: RETRIEVE_CART,
        payload: res.data,
      });

      return Promise.resolve();
    } catch (err) {
      console.log(err);
    }
  };
  
  // export const updateProduct = (id, data) => async (dispatch) => {
  //   try {
  //     const res = await productService.update(id, data);
  
  //     dispatch({
  //       type: UPDATE_CART,
  //       payload: data,
  //     });
  
  //     return Promise.resolve(res.data);
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // };
  
  export const removeItem = (id) => async (dispatch) => {
    try {
      await cartService.removeItem(id);
  
      dispatch({
        type: DELETE_CART,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
