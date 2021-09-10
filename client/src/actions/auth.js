import * as api from '../api';

// Action Creators
import { AUTH } from '../constants/actionTypes.js';

// We receive formData from the Auth.js component
export const signin = (formData, history) => async (dispatch) => {
    try {
        // send data to the backend/database and log in the user..
        // call api endpoints
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // send data to the backend/database and sign up the user..
        // call api endpoints
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}