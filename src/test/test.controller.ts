import { Controller, Get, HttpCode, Post } from "@nestjs/common";
import { TestService } from "./test.service";

@Controller("test")
export class TestController {
    constructor(private readonly testService: TestService) {}

    @Get("ping")
    @HttpCode(200)
    async getPatient() {
        return await this.testService.ping();
    }
}
