import { Controller, Get, HttpCode, Post, Body } from "@nestjs/common";
import { TestService } from "./user.service";
import { v4 } from "uuid";
import { UserRegister } from "./dto/user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/register")
    async loginHandler(@Body() bodyParams: UserRegister) {
        return await this.userService.register(bodyParams);
    }

    // @Post("login")
    // async login(@Body() payload: any) {
    //     const { name, password }: { name: string; password: string } = payload;
    //     const id = v4();
    //     const passwordHash = hashPassword(password);
    //     const params: any = { id, name, passwordHash };

    //     try {
    //         const result = login(params);

    //         return result;
    //     } catch (error) {
    //         return error;
    //     }
    // }
}
