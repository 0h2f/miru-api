import postRepository from "../repositories/postRepository";
import type { Post } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

/*
type ReqDictionary = { id?: string }
type ReqBody = { id?: string }
type ReqQuery = { id?: string }
type PostRequest = Request<ReqDictionary, ReqBody, ReqQuery>
*/

async function getPost(req: Request, res: Response, next: NextFunction) {
    try {
        let { id } = req.params || req.body || req.query
        let parsedId = parseInt(id);

        if (isNaN(parsedId))
            throw new Error("Id invalido");

        let post = await postRepository.getPost(parsedId);

        if (post)
            res.json(post);
        else
            res.sendStatus(404);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function getPosts(req: Request, res: Response, next: NextFunction) {
    try {
        let posts = await postRepository.getPosts();

        if (posts)
            res.json(posts);
        else
            res.sendStatus(500);
    }
    catch (error) {
        return res.sendStatus(500);
    }
}

async function postPost(req: Request, res: Response, next: NextFunction) {
    try {
        let post = req.body as Post;
        let result = await postRepository.addPost(post);

        if (result)
            res.status(201).json(result);
        else
            res.sendStatus(400);
    }
    catch (error) {
        return res.sendStatus(500);
    }
}


async function deletePost(req: Request, res: Response, next: NextFunction) {
    try {
        let { id } = req.body;
        let parsedId = parseInt(id);

        if (isNaN(parsedId))
            throw new Error("Id invalido");

        let deletedPost = await postRepository.deletePost(parsedId);

        if (deletedPost)
            res.sendStatus(204);
        else
            res.sendStatus(404);
    }
    catch (error) {
        return res.sendStatus(500);
    }
}

async function patchPost(req: Request, res: Response, next: NextFunction) {
    try {
        let post = req.body as Post;
        let { id } = req.params;
        let parsedId = parseInt(id);

        if (isNaN(parsedId))
            throw new Error("Id invalido");

        let updatedPost = await postRepository.updatePost(parsedId, post);
        if (updatedPost)
            res.status(200).json(updatedPost);
        else
            res.sendStatus(404);
    }
    catch (error) {
        return res.sendStatus(500);
    }
}

export default {
    getPost,
    getPosts,
    postPost,
    deletePost,
    patchPost
}