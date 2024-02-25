import comunityRepository from "src/repositories/comunityRepository";
import type { Comunity } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

async function getComunity(req: Request, res: Response, next: NextFunction) {
    try {
        let { id } = req.params || req.body || req.query
        let parsedId = parseInt(id);

        if (isNaN(parsedId))
            throw new Error("Id invalido");

        let post = await comunityRepository.getComunity(parsedId);

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


async function postComunity(req: Request, res: Response, next: NextFunction) {
    try {
        let comunity = req.body as Comunity;
        let result = await comunityRepository.addComunity(comunity);

        if (result)
            res.status(201).json(result);
        else
            res.sendStatus(400);
    }
    catch (error) {
        return res.sendStatus(500);
    }
}

export default {
    getComunity,
    postComunity
}
