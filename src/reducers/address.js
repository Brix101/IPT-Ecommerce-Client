import {
    ADD_ADDRESS,
    RETRIEVE_ADDRESS,
    UPDATE_ADDRESS,
    DELETE_ADDRESS,
  } from "../actions/types";
  
  const initialState = [];
  
  function addressReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_ADDRESS:
        return [...state, payload];
  
      case RETRIEVE_ADDRESS:
        return payload;
  
      case UPDATE_ADDRESS:
        return state.map((address) => {
          if (address.id === address.id) {
            return {
              ...state,
              ...payload,
            };
          } else {
            return state;
          }
        });
  
      case DELETE_ADDRESS:
        return state.filter(({ id }) => id !== payload.id);
  
      default:
        return state;
    }
  };
  
  export default addressReducer;