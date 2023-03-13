import { Controller, Get, HttpCode, Post, Body } from "@nestjs/common";
import { TestService } from "./test.service";
import { v4 } from "uuid";



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



  }
}
