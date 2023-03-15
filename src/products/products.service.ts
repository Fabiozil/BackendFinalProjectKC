import { Injectable } from "@nestjs/common";
import { ResponseService } from "../common/helpers/response.service";
import { LoggerHelper } from "../common/helpers/logging";
import { UserModel } from "../common/model/user.model";

const jwt = require("jsonwebtoken");

@Injectable()
export class ProductsService {
    constructor(
        private readonly responseService: ResponseService,
        private readonly logger: LoggerHelper,
        private readonly userModel: UserModel
    ) {}

    async ping() {
        return this.responseService.success("Success ping with token", {
            response: [],
        });
    }

    async ping2() {
        return this.responseService.success("Success ping 2", { response: [] });
    }
}