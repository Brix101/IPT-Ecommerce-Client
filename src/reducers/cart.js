import {
    ADD_TO_CART,
    RETRIEVE_CART,
    UPDATE_CART,
    DELETE_CART,
  } from "../actions/types";
  
  const initialState = [];
  
  function cartReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_TO_CART:
        return payload;
  
      case RETRIEVE_CART:
        return payload ;
  
      case UPDATE_CART:
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
  
      case DELETE_CART:
        // return state.filter(({ id }) => id !== payload.id);
        return state.filter(({ id }) => id !== payload.cartItem.productId);
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  