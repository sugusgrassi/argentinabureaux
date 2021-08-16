// function

// The state is posts
export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
            break;
        case 'CREATE':
            return [...posts, action.payload]
        break;
        default:
            return posts;
    }
}