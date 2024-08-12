import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { addComments, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPosts, getCommentsOfPost, likePost } from '../controllers/post.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.route('/addPost').post(isAuthenticated, upload.single('image'), addNewPost);
router.route('/all').post(isAuthenticated, getAllPosts);
router.route('/userpost/all').post(isAuthenticated, getAllPosts);
router.route('/:id/like').post(isAuthenticated, likePost);
router.route('/:id/dislike').post(isAuthenticated, dislikePost);
router.route('/:id/comment').post(isAuthenticated, addComments);
router.route('/:id/comment/all').post(isAuthenticated, getCommentsOfPost);
router.route('/delete/:id').post(isAuthenticated, deletePost);
router.route('/:id/bookmark').post(isAuthenticated, bookmarkPost);

export default router;