import * as api from '../api';

// Action Creators
import { CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, LIKE, START_LOADING, END_LOADING } from '../constants/actionTypes.js';

// async data, so use redux thunk to specify an aditional arrow function: async (dispatch). A function that returns another function
export const getPosts = (page) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        // receive the response {data obj} from the api 
        const { data } = await api.fetchPosts(page);

        console.log(data)
        // dispatch the action
        dispatch({ type: FETCH_ALL, payload: data });

        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error.message)
    }
};

export const getPost = (id) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING })
        
    } catch (error) {
        console.log(error.message)
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.fetchPostsBySearch(searchQuery);
        // console.log(data.data)
        dispatch({ type: FETCH_BY_SEARCH, payload: data.data});

        // or destructuring
        // const { data: { data} } = await api.fetchPostsBySearch(searchQuery);
        // dispatch({ type: FETCH_BY_SEARCH, payload: data});

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log(error)
    }
}


export const createPost = (post, history) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post); 

        history.push(`/posts/${data._id}`);
        
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