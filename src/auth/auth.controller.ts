import { Controller, Get, HttpCode, Post, Body, Param, Query,Headers } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLogin, AuthRegister } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/register")
    async registerHandler(@Body() bodyParams: AuthRegister) {
        return await this.authService.register(bodyParams);
    }

    @Post("/login")
    async loginHandler(@Body() bodyParams: AuthLogin) {
        return await this.authService.login(bodyParams);
    }

    @Get("/ping")
    async pingHandler() {
        return await this.authService.ping();
    }

}