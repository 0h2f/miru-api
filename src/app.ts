import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import postRouter from './routers/postRouter'
import userRouter from './routers/userRouter';

import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()
export const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/posts/', postRouter);
app.use('/users/', userRouter);

app.use('/',(req: Request, res: Response, next: NextFunction) => {
    res.send("Miru API 0.1");
})
 
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

