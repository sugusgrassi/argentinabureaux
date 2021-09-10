import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'

import auth from '.../middleware/auth.js';

const router = express.Router();

// http://localhost:5000/posts

// Logic to the controllers:
// router.get('/', (req, res) => {
//     res.send('This works!')
// })
// so:
router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;