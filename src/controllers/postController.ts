import postRepository from "../repositories/postRepository";
import type { Post } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";

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
        next(error);
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
        next(error);
    }
}

async function postPost(req: Request, res: Response, next: NextFunction) {
    try {
        let { image } = req.body;
        let token = req.header('x-access-token')!;

        if (!image)
            throw new Error("Cannot create post without image.");

        let userToken = authService.decodeToken(token);
        if (userToken.type != 'valid')
            throw new Error(`Failed to validate authentication token: ${userToken.type}.`);

        let result = await postRepository.addPost({
            image: image,
            authorId: userToken.tokenData.id,

        });

        if (result)
            res.status(201).json(result);
        else
            res.sendStatus(500);
    }
    catch (error) {
        next(error);
    }
}


async function deletePost(req: Request, res: Response, next: NextFunction) {
    try {
        let { id } = req.body;
        let parsedId = parseInt(id);
        let token = req.header('x-access-token')!;
        let userToken = authService.decodeToken(token);

        if (userToken.type != 'valid')
            throw new Error(`Failed to validate authentication token: ${userToken.type}.`);
        if (isNaN(parsedId))
            throw new Error("Id invalido");

        let originalPost = await postRepository.getPost(parsedId);
        if (originalPost?.authorId != userToken.tokenData.id)
            throw new Error("User is not the author.");
        let deletedPost = await postRepository.deletePost(parsedId);

        if (deletedPost)
            res.sendStatus(204);
        else
            res.sendStatus(404);
    }
    catch (error) {
        next(error);
    }
}

async function patchPost(req: Request, res: Response, next: NextFunction) {
    try {

        let { image, id } = req.body;
        let parsedId = parseInt(id);
        let token = req.header('x-access-token')!;

        if (isNaN(parsedId) || !parsedId)
            throw new Error("Invalid post ID");
        if (!image)
            throw new Error("Cannot modify post without image.");

        let userToken = authService.decodeToken(token);
        if (userToken.type != 'valid')
            throw new Error(`Failed to validate authentication token: ${userToken.type}.`);

        let originalPost = await postRepository.getPost(parsedId);
        if (originalPost?.authorId != userToken.tokenData.id)
            throw new Error("User is not the author.");

        let updatedPost = await postRepository.updatePost(parsedId, {
            image: image,
            authorId: userToken.tokenData.id
        });
        if (updatedPost)
            res.status(200).json(updatedPost);
        else
            res.sendStatus(404);
    }
    catch (error) {
        next(error);
    }
}

export default {
    getPost,
    getPosts,
    postPost,
    deletePost,
    patchPost
}