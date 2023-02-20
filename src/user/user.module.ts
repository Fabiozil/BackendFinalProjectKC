import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TestService } from "./user.service";
import { ResponseService } from "../common/helpers/response.service";
import { UUIDValidator } from "../common/middleware/uuid-validator";
import { LoggerHelper } from "../common/helpers/logging";
import { TestController } from "./user.controller";

@Module({
    providers: [ResponseService, LoggerHelper, TestService],
    controllers: [TestController],
})
export class TestModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UUIDValidator).forRoutes(TestService);
    }
}
