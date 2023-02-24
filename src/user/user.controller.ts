import { Controller, Get, HttpCode, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto"

import { v4 } from "uuid";


@Controller("user")
export class USerController {
    constructor( private readonly userService: UserService) {}

    

    @Post("login")
    login(@Body() payload: any) {
        const id = v4()
        const data:CreateUserDto = {id:id,email:payload.email, password:payload.password}
    
        return this.userService.createUser(data)
       
    }
} 
