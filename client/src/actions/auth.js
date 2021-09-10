import * as api from '../api';

// Action Creators
import { AUTH } from '../constants/actionTypes.js';

// We receive formData and history from the Auth.js component
// What was dispatch from the component was the following action
export const signin = (formData, history) => async (dispatch) => {
    try {
        // send data to the backend/database and log in the user..
        // call api endpoints
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data})

        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // send data to the backend/database and sign up the user..
        // call api endpoints
        const { data } = await api.signUn(formData);

        dispatch({ type: AUTH, data})

        history.push('/')
    } catch (error) {
        console.log(error)
    }
}