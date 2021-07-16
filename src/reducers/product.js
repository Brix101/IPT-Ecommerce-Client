import {
    CREATE_PRODUCT,
    RETRIEVE_PRODUCTS,
    UPDATE_PRODUCT,
    DELETE_PRODUCT
  } from "../actions/types";
  
  const initialState = [];
  
  function productReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_PRODUCT:
        return [...state, payload];
  
      case RETRIEVE_PRODUCTS:
        return payload;
  
      case UPDATE_PRODUCT:
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
  
      case DELETE_PRODUCT:
        return state.filter(({ id }) => id !== payload.id);
  
      default:
        return state;
    }
  };
  
  export default productReducer;
  