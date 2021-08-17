import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js'

const router = express.Router();

// http://localhost:5000/posts

// Logic to the controllers:
// router.get('/', (req, res) => {
//     res.send('This works!')
// })
// so:
router.get('/', getPosts);
router.post('/', createPost);

export default router;