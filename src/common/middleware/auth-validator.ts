import { NestMiddleware, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

@Injectable()
export class VerifyToken implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res
                .status(403)
                .json({ error: "A token is required for authentication " });
        }

        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decoded;
        } catch (err) {
            console.error(err);
            return res.status(401).json({ error: "Invalid token" });
        }
        return next();
    }
}
