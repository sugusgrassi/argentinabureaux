import * as api from '../api';

// Action Creators

// async data, so use redux thunk to specify an aditional arrow function: async (dispatch). A function that returns another function
export const getPosts = () => async (dispatch) => {
    try {
        // receive the response {data obj} from the api 
        const { data } = await api.fetchPosts();
        // dispatch the action
        dispatch({ type: "FETCH_ALL", payload: data });
    } catch (error) {
        console.log(error.message)
    }
};


export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post); 

        dispatch({ type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error)
    }
}