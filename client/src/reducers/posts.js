// function

import { CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, LIKE } from '../constants/actionTypes.js';


// The state is posts
const posts = (state = [], action) => {
    switch (action.type) {
        case DELETE:
            return state.filter((post) => post._id !== action.payload);
        case UPDATE:
        case LIKE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post)
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case CREATE:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default posts;
