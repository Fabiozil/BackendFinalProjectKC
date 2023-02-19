import { Controller, Get, HttpCode, Post, Body } from "@nestjs/common";
import { TestService } from "./test.service";
import { v4 } from "uuid";
import {login} from "../DynamoDb/Tabala_user"
import { hashPassword } from "src/sesion/metodos/hashCrypto";


@Controller("test")
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get("ping")
  @HttpCode(200)
  async getPatient() {
    return await this.testService.ping();
  }

  @Post("login")
  async login(@Body() payload: any) {
    const { name, password }: { name: string; password: string } = payload;
    const id = v4();
    const passwordHash = hashPassword(password)
    const params: any = { id, name, passwordHash };
 
   
    try {
      const result = login(params)

      return result
    
    } catch (error) {
      return error;
    }
    
  }
}
