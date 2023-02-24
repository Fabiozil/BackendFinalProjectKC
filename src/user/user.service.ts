import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";

import { ResponseService } from "../common/helpers/response.service";
import { WriteDatabaseAuth } from "../common/model/testModel.module";
import { CreateUserDto } from "./user.dto"



@Injectable()
export class UserService {
    constructor(
        private readonly responseService: ResponseService,
        private readonly dateBase: WriteDatabaseAuth,
        private jwtService: JwtService
    ) {}

    async createUser(data:CreateUserDto) {
 

        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;

        //return this.dateBase.EmailFind(data.email)
        const userCreated = await this.dateBase.CreateUser(data);
        try {
            
            this.generateJWT(userCreated)

        } catch (error) {
            console.log("🚀 ~ file: user.service.ts:32 ~ UserService ~ createUser ~ error:", error)
            throw new UnauthorizedException('could not create user')
            
        }
         
    }

    async ping2() {
        return this.responseService.success("Success ping 2", { response: [] });
    }

    generateJWT(user:CreateUserDto){
        const payload = {
            sub:user.id
        }
        return {
            access_token : this.jwtService.sign(payload),user
        };
    }
}
