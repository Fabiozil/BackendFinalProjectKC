import { Controller, createParamDecorator, Get, Headers } from "@nestjs/common";
import { UserInterface } from "./interface/user.interface";
import { UserService } from "./user.service";

const User = createParamDecorator((data, req) => {
    return req.args[0].user;
});
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/refresh-token")
    async refreshToken(@User() user: UserInterface) {
        return await this.userService.refreshToken(user);
    }
}
