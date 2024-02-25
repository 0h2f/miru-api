import express from 'express';
import postController from '../controllers/postController';
 
const postRouter = express.Router();
 
postRouter.get('/', postController.getPosts);
postRouter.get('/:id', postController.getPost);
postRouter.post('/', postController.postPost);
postRouter.patch('/:id', postController.patchPost);
postRouter.delete('/', postController.deletePost);
 
export default postRouter;