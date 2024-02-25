import userRepository from "../repositories/userRepository";
import type { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

async function postUser(req: Request, res: Response, next: NextFunction) {
    try {
        let user = req.body as User;
        let userExists = await userRepository.getUserByUsername(user.username);
        let emailExists = await userRepository.getUserByEmail(user.email);

        if (userExists)
            throw new Error("Username already exists!");
        if (emailExists)
            throw new Error("Email already in use!")

        let result = await userRepository.addUser(user);

        if (result)
            res.status(201).json(result);
        else
            res.sendStatus(400);
    }
    catch (error) {
        console.log(error);
    }
}

export default {
    postUser
}