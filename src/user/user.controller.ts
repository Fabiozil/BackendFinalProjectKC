import { Controller, Get,Headers } from "@nestjs/common";
import { UserService } from "./user.service";


@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/RefresToken")
    async reFresToken(@Headers('user') user){
        
        return await this.userService.refreshToken(user);
    }
}
