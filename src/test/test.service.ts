import { Injectable } from "@nestjs/common";
import { ResponseService } from "../common/helpers/response.service";
import { LoggerHelper } from "../common/helpers/logging";
import { WriteDatabase } from "../common/model/testModel.module";

@Injectable()
export class TestService {
    constructor(
        private readonly responseService: ResponseService,
        private readonly logger: LoggerHelper
    ) {}

    async ping() {
        const response = await WriteDatabase();
        return this.responseService.success("Success ping", { response: [] });
    }

    async ping2() {
        return this.responseService.success("Success ping 2", { response: [] });
    }
}
