import { Request, Response, NextFunction, response } from "express";
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs'
import path from 'path'

const public_key = fs.readFileSync(path.join("__dirname", "../public.pem"));
const private_key = fs.readFileSync(path.join("__dirname", "../private.pem"));

export interface TokenData {
    id: number,
    username: string,
    issued: number,
    expires: number
}
export type PartialTokenData = Omit<TokenData, "issued" | "expires">;

export interface Token {
    token: string,
    expires: number,
    issued: number
}

export type TokenResult = { type: "valid", tokenData: TokenData }
    | { type: "integrity-error"; }
    | { type: "invalid-token"; };

export type TokenStatus = "expired" | "active" | "grace";

export function encodeToken(partialToken: PartialTokenData): Token {
    let issued = Date.now();
    let expireIn = 60 * 60 * 1000;
    let data: TokenData = {
        ...partialToken,
        issued: issued,
        expires: issued + expireIn
    }
    //var res = jwt2.verify(token, public_key, { algorithm: 'RS256'})
    return {
        token: jwt.sign(data, private_key, { algorithm: 'RS256', expiresIn: expireIn }),
        issued: issued,
        expires: issued + expireIn
    }
}

export function decodeToken(tokenString: string): TokenResult {
    let tokenData: TokenData;

    try {
        tokenData = jwt.verify(tokenString, public_key) as TokenData;
    }
    catch (error) {
        if (error instanceof Error)
            switch (error.message) {
                case "invalid token":
                case "jwt malformed":
                case "jwt expired":
                    return { type: "invalid-token" }
                case "jwt not active":
                case "jwt signature is required":
                case "invalid signature":
                    return { type: "integrity-error" }
            }
        throw error;
    }
    return { type: "valid", tokenData: tokenData }
}

export function validateToken(tokenData: TokenData): TokenStatus {
    let dateNow = Date.now();
    let expireIn = tokenData.expires + (1000 * 60 * 60 * 24);

    if (tokenData.expires > dateNow) return 'active';
    if (expireIn > dateNow) return 'grace';
    return 'expired';
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authenticationHeader = 'x-access-token'
    let token = req.header(authenticationHeader);
    
    if (!token)
        throw new Error("This request requires user authentication.");

    let decodedToken: TokenResult = decodeToken(token);
    if (decodedToken.type != 'valid')
        throw new Error(`Failed to validate authentication token: ${decodedToken.type}.`);

    let tokenStatus: TokenStatus = validateToken(decodedToken.tokenData);
    if (tokenStatus === 'expired')
        throw new Error("Authentication token has expired.")
    
    if(tokenStatus === 'grace') {
        let {token, expires, issued} = encodeToken(decodedToken.tokenData);
        decodedToken.tokenData = {
            ...decodedToken.tokenData,
            expires: expires,
            issued: issued
        }
        res.setHeader(authenticationHeader, token);
    } else {
        response.locals = {
            ...response.locals,
            tokenData: decodedToken.tokenData
        }
    }
    next();
}