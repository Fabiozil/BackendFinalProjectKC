import { Controller, Get, HttpCode, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";

import { v4 } from "uuid";


@Controller("user")
export class USerController {
    constructor(private readonly userService: UserService) {}

    

    @Post("login")
    login(@Body() payload: any) {
        
         return this.userService.createUser(payload)
    }
}
