import mongoose from 'mongoose';

// data for each post
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    president: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage;