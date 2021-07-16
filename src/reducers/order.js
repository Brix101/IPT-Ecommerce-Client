import {
    CREATE_ORDER,
    RETRIEVE_ORDERS,
    UPDATE_ORDER,
    DELETE_ORDER
  } from "../actions/types";
  
  const initialState = [];
  
  function orderReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_ORDER:
        return [...state, payload];
  
      case RETRIEVE_ORDERS:
        return payload;
  
      case UPDATE_ORDER:
        return state.map((product) => {
          if (product.id === payload.id) {
            return {
              ...product,
              ...payload,
            };
          } else {
            return state;
          }
        });
  
      case DELETE_ORDER:
        return state.filter(({ id }) => id !== payload.id);
  
      default:
        return state;
    }
  };
  
  export default orderReducer;
  