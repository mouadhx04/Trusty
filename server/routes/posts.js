import express from "express";

const router = express.Router();
// "http://localhost:5000/posts" will be the path of all routes here

import { getPost, getPostsBySearch, getposts, createPosts, updatePost, deletePost, likePost, commentPost } from '../controllers/posts.js'; 


import auth from "../middleware/auth.js";

router.get('/search', getPostsBySearch);
router.get('/', getposts);
router.get('/:id', getPost);
router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

router.post('/:id/commentPost', auth, commentPost);
export default router;
