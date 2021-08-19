// logic
import mongoose from 'mongoose';
import posts from '../../client/src/reducers/posts.js';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        console.log(postMessages)

        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;

    //from the frontend
    const post = req.body; 

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    // { new: true } to receive the updated version of the post
    const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });

    res.json(updatePost)
}



