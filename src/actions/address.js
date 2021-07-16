import {
    ADD_ADDRESS,
    RETRIEVE_ADDRESS,
    UPDATE_ADDRESS,
    DELETE_ADDRESS,

    SET_MESSAGE
    } from "./types";

    import addressService from '../services/address.service'

export const addAddress = (address) => (dispatch) => {
    return addressService.addAddress(address)
    .then(
        (response) => {
        dispatch({
            type: ADD_ADDRESS,
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
    
export const getAddress = () => async (dispatch) => {
    return await addressService.getAddress()
    .then((response) => {
        dispatch({
            type: RETRIEVE_ADDRESS,
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

export const getOneAddress = (id) => async (dispatch) => {
    return await addressService.getOneAddress(id)
    .then((response) => {
        dispatch({
            type: RETRIEVE_ADDRESS,
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

export const updateAddress = (id, data) => async (dispatch) => {
    return await addressService.updateAddress(id, data)
        .then((response)=>{
            dispatch({
                type: UPDATE_ADDRESS,
                payload: data,
            });

            dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
            });
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
        })

};

export const removeAddress = (id) => async (dispatch) => {
    return await addressService.removeAddress(id)
        .then((response)=>{
            dispatch({
                type: DELETE_ADDRESS,
                payload: { id },
            });

            dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
            });
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
        })

};


