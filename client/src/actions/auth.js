import * as api from '../api';

// Action Creators
import { AUTH } from '../constants/actionTypes.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in the user..

        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // sign up the user..

        history.push('/')
    } catch (error) {
        console.log(error)
    }
}