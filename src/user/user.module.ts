import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserService } from "./user.service";
import { ResponseService } from "../common/helpers/response.service";
import { UUIDValidator } from "../common/middleware/uuid-validator";
import { LoggerHelper } from "../common/helpers/logging";
import { USerController } from "./user.controller";
import { WriteDatabaseAuth } from "../common/model/testModel.module";

@Module({
    providers: [ResponseService, LoggerHelper, UserService,WriteDatabaseAuth],
    controllers: [USerController],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UUIDValidator).forRoutes(USerController);
    }
}
