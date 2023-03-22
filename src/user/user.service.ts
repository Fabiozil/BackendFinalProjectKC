import { Injectable } from "@nestjs/common";
import { ResponseService } from "../common/helpers/response.service";
import { LoggerHelper } from "../common/helpers/logging";
import { UserModel } from "../common/model/user.model";

const jwt = require("jsonwebtoken");

@Injectable()
export class UserService {
    constructor(
        private readonly responseService: ResponseService,
        private readonly logger: LoggerHelper,
        private readonly userModel: UserModel
    ) {}

    async refreshToken({ username, email, id }) {
        const token = jwt.sign(
            {
                username,
                email,
                id,
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        );
        return this.responseService.success("New token created successfully", {
            response: [{ token, username, email, id }],
        });
    }
}
