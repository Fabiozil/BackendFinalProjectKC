import { Injectable } from "@nestjs/common";
import { ResponseService } from "../common/helpers/response.service";
import { LoggerHelper } from "../common/helpers/logging";
import { UserRegister } from "./dto/user.dto";
import { UserModel } from "../common/model/user.model";
import jwt from "jsonwebtoken";

@Injectable()
export class TestService {
    constructor(
        private readonly responseService: ResponseService,
        private readonly logger: LoggerHelper,
        private readonly userModel: UserModel
    ) {}

    async ping() {
        return this.responseService.success("Success ping", { response: [] });
    }

    async ping2() {
        return this.responseService.success("Success ping 2", { response: [] });
    }
    async register(bodyParams: UserRegister) {
        try {
            const userData = await this.userModel.register(bodyParams);
            const token = jwt.sign(
                { username: userData.username, email: userData.email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            );
        } catch (err) {
            console.error(err);
            return this.responseService.error(err, []);
        }
}
