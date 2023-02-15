import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TestService } from "./test.service";
import { ResponseService } from "../common/helpers/response.service";
import { UUIDValidator } from "../common/middleware/uuid-validator";
import { LoggerHelper } from "../common/helpers/logging";
import { TestController } from "./test.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    providers: [ResponseService, LoggerHelper, TestService],
    controllers: [TestController],
})
export class TestModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UUIDValidator).forRoutes(TestService);
    }
}
