import {
    ADD_TO_WISHLIST,
    RETRIEVE_WISHLIST,
    DELETE_WISHLIST
  } from "../actions/types";
  
  const initialState = [];
  
  function wishlistReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_TO_WISHLIST:
        return [...state, payload];
  
      case RETRIEVE_WISHLIST:
        return payload;
  
      case DELETE_WISHLIST:
        return state.filter(({ id }) => id !== payload.id);
  
      default:
        return state;
    }
  };
  
  export default wishlistReducer;
  