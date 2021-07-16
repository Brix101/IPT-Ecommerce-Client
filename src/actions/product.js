import {
    CREATE_PRODUCT,
    RETRIEVE_PRODUCTS,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,

    SET_MESSAGE
  } from "./types";
  
  import productService from "../services/product.service";

  export const createProduct = (data) => (dispatch) => {
    return productService.create(data).then(
      (response) => {
        dispatch({
          type: CREATE_PRODUCT,
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
  
  export const getProducts = () => (dispatch) => {
    return productService.getAll()
      .then((response) => {
          dispatch({
            type: RETRIEVE_PRODUCTS,
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
  export const getProduct = (id) => (dispatch) => {
    try {
      const res = productService.getProduct(id);
  
      dispatch({
        type: RETRIEVE_PRODUCTS,
        payload: res.data,
      });

      return Promise.resolve();
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateProduct = (id, data) => (dispatch) => {
    try {
      const res = productService.update(id, data);
  
      dispatch({
        type: UPDATE_PRODUCT,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteProduct = (id) => (dispatch) => {
    try {
     productService.remove(id);
  
      dispatch({
        type: DELETE_PRODUCT,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const findProductByName = (name) => (dispatch) => {
    return productService.findByName(name)
    .then((response) => {
      dispatch({
        type: RETRIEVE_PRODUCTS,
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