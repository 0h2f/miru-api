import type { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'
import userRepository from "../repositories/userRepository";
import * as authService from "../services/authService"

async function postUser(req: Request, res: Response, next: NextFunction) {
    try {
        let user = req.body as User;
        let userExists = await userRepository.getUserByUsername(user.username);
        let emailExists = await userRepository.getUserByEmail(user.email);

        if (userExists)
            throw new Error("Username already exists!");
        if (emailExists)
            throw new Error("Email already in use!")
        if (!user.password)
            throw new Error("Password cannot be empty")

        user.password = bcrypt.hashSync(user.password, 10);
        let result = await userRepository.addUser(user);

        if (result)
            res.status(201).json(result);
        else
            res.sendStatus(400);
    }
    catch (error) {
        next(error);
    }
}

async function authenticateUser(req: Request, res: Response, next: NextFunction) {
    try {
        let { username, password } = req.body;

        let user = await userRepository.getUserByUsername(username);
        if (!user)
            throw new Error("Invalid username or password")

        let pwdValid = await bcrypt.compare(password, user.password);
        if (!pwdValid)
            throw new Error("Invalid username or password")

        let accessToken: authService.Token = authService.encodeToken({
            id: user.id,
            username: user.username
        });

        res.status(201).send(accessToken);

        }
        catch (error) {
            next(error);
        }
}
export default {
    postUser,
    authenticateUser
}