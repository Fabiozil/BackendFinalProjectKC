import { Controller, Get, Headers } from "@nestjs/common";
import { UserInterface } from "./interface/user.interface";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/refresh-token")
    async refreshToken(@Headers("user") user: UserInterface) {
        return await this.userService.refreshToken(user);
    }
}
