import express from 'express';
import comunityController from 'src/controllers/comunityController';
 
const comunityRouter = express.Router();

comunityRouter.get('/:id', comunityController.getComunity);
comunityRouter.post('/', comunityController.postComunity);
 
export default comunityRouter;