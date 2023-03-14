import { NestMiddleware, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

@Injectable()
export class VerifyToken implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res
                .status(403)
                .send("A token is required for authentication ");
        }

        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decoded;
        } catch (err) {
            return res.status(401).send("Invalid token");
        }
        return next();
    }
}
