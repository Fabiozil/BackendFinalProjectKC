import { Injectable } from "@nestjs/common";
import { ResponseService } from "../common/helpers/response.service";
import { WriteDatabaseAuth } from "src/common/model/testModel.model";
import * as bcrypt from "bcrypt"
import { v4 } from "uuid";


@Injectable()
export class UserService {
    constructor(
        private readonly responseService: ResponseService,
        private readonly dateBase: WriteDatabaseAuth
    ) {}

    async createUser(data:any) {

        const id = v4()
        data.set(id)

        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;

        return this.dateBase.CreateUser(data);
    }

    async ping2() {
        return this.responseService.success("Success ping 2", { response: [] });
    }
}
