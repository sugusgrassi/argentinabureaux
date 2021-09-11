// logic
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        // console.log(postMessages)

        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()});

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

    // checks if the id is valid
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    // { new: true } to receive the updated version of the post
    const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });

    res.json(updatePost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    console.log('delete')
    // checks if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });

}

export const likePost = async (req, res) => {
    const { id } = req.params;

    // console.log('LIKE')
    if(!req.userId) return res.json({ message: 'no autenticado'})

    // checks if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    //without user:
    // findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, { new: true });


    res.json(updatedPost);

}