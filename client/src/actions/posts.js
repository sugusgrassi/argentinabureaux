import * as api from '../api';

// Action Creators
import { CREATE, UPDATE, DELETE, FETCH_ALL, LIKE } from '../constants/actionTypes.js';

// async data, so use redux thunk to specify an aditional arrow function: async (dispatch). A function that returns another function
export const getPosts = () => async (dispatch) => {
    try {
        // receive the response {data obj} from the api 
        const { data } = await api.fetchPosts();
        // dispatch the action
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message)
    }
};


export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post); 

        dispatch({ type: CREATE, payload: data});
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error)
    }
}