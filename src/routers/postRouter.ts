import express from 'express';
import postController from '../controllers/postController';
import * as authService from '../services/authService';
 
const postRouter = express.Router();
 
postRouter.get('/', postController.getPosts);
postRouter.get('/:id', postController.getPost);
postRouter.post('/', postController.postPost, authService.authenticateToken);
postRouter.patch('/:id', postController.patchPost);
postRouter.delete('/', postController.deletePost);
 
export default postRouter;