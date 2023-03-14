import { Controller, Get, HttpCode, Post, Body, Param, Query,Headers } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserLogin, UserRegister } from "./dto/user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/register")
    async registerHandler(@Body() bodyParams: UserRegister) {
        return await this.userService.register(bodyParams);
    }

    @Post("/login")
    async loginHandler(@Body() bodyParams: UserLogin) {
        return await this.userService.login(bodyParams);
    }

    @Get("/RefresToken")
    async reFresToken(@Headers('user') user){
        //console.log("🚀 ~ file: user.controller.ts:22 ~ UserController ~ reFresToken ~ user.user:", user)
        
        return await this.userService.refreshToken(user);
    }
   
    @Get("/ping")
    async pingHandler() {
        return await this.userService.ping();
    }

}
