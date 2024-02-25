import express from 'express';
import mangaController from 'src/controllers/mangaController';

const mangaRouter = express.Router();
 
mangaRouter.get('/:id', mangaController.getManga);
mangaRouter.post('/', mangaController.postManga);
 
export default mangaRouter;