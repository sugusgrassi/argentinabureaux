import mongoose from "mongoose";

// data for each user
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    id: {
        type: String
    }
})

// 'User' is the model
// userSchema: The schema in which that model is built upon
const User = mongoose.model('User', userSchema)

export default User;