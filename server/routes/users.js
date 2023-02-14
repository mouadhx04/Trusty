import express from "express";

const router = express.Router();
// "http://localhost:5000/posts" will be the path of all routes here

import { signIn, signUp } from '../controllers/user.js'; 

router.post('/signin', signIn);
router.post('/signup', signUp);

export default router;