import {
    CREATE_ORDER,
    RETRIEVE_ORDERS,
    UPDATE_ORDER,
    DELETE_ORDER,

    SET_MESSAGE
  } from "./types";
  
  import orderService from "../services/order.service";

  export const createOrder = (data) => (dispatch) => {
    return orderService.create(data).then(
      (response) => {
        dispatch({
          type: CREATE_ORDER,
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
  
  export const getAllOrder = () => (dispatch) => {
    return orderService.getAllOrder()
      .then((response) => {
          dispatch({
            type: RETRIEVE_ORDERS,
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
  
  export const updateStatus = (id, data) => (dispatch) => {
    try {
      const res = orderService.updateStatus(id, data);
  
      dispatch({
        type: UPDATE_ORDER,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteProduct = (id) => (dispatch) => {
    // try {
    //     orderService.remove(id);
  
    //   dispatch({
    //     type: DELETE_ORDER,
    //     payload: { id },
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  export const findOrderByStatus = (status) => (dispatch) => {
    return orderService.findByStatus(status)
    .then((response) => {
      dispatch({
        type: RETRIEVE_ORDERS,
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

  export const findBySeller = (status) => (dispatch) => {
    return orderService.findBySeller(status)
    .then((response) => {
      dispatch({
        type: RETRIEVE_ORDERS,
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
