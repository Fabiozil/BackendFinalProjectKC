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
        private readonly userModel: UserModel,
        
    ) {}

    async ping() {
        return this.responseService.success("Success ping with token", {
            response: [],
        });
    }

    async ping2() {
        return this.responseService.success("Success ping 2", { response: [] });
    }

    async refreshToken({username,email,id}) {
        if(username!! || email!! || id!!){
            return this.responseService.error("credentials not found", []);
        }

        const token = jwt.sign(
            {
                username: username,
                email: email,
                id: id,
            },
            "7Ec77I4r39V*#c!cPZ#X@t9", // process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        );
        return this.responseService.success("New token created successfully",{
            response:[{token}]
            })
        
    }
}
