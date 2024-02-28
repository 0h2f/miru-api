import mangaRepository from "src/repositories/mangaRepository";
import type { Manga } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

async function getManga(req: Request, res: Response, next: NextFunction) {
    try {
        let { id } = req.params || req.body || req.query
        let parsedId = parseInt(id);

        if (isNaN(parsedId))
            throw new Error("Id invalido");

        let post = await mangaRepository.getManga(parsedId);

        if (post)
            res.json(post);
        else
            res.sendStatus(404);
    }
    catch (error) {
        next(error);
    }
}


async function postManga(req: Request, res: Response, next: NextFunction) {
    try {
        let manga = req.body as Manga;
        let result = await mangaRepository.addManga(manga);

        if (result)
            res.status(201).json(result);
        else
            res.sendStatus(400);
    }
    catch (error) {
        next(error);
    }
}

export default {
    getManga,
    postManga
}