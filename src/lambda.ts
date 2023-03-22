// lambda.ts
import { Handler, Context } from "aws-lambda";
import { Server } from "http";
import { createServer, proxy } from "aws-serverless-express";
import { eventContext } from "aws-serverless-express/middleware";

import { NestFactory } from "@nestjs/core";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
const express = require("express");

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;
const SWAGGER_ENVS = ["development", "QA"];

async function bootstrapServer(): Promise<Server> {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressApp)
        );
        nestApp.use(eventContext());
        nestApp.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
            })
        );
        nestApp.enableVersioning({
            type: VersioningType.URI,
        });
        await nestApp.init();
        cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
    }
    return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
    if (event.headers["Content-Type"]) {
        if (
            event.body &&
            event.headers["Content-Type"].includes("multipart/form-data")
        ) {
            event.body = Buffer.from(event.body, "binary") as unknown as string;
        }
    }
    cachedServer = await bootstrapServer();
    return proxy(cachedServer, event, context, "PROMISE").promise;
};
