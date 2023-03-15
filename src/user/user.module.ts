import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { UserService } from "./user.service";
import { ResponseService } from "../common/helpers/response.service";
import { UUIDValidator } from "../common/middleware/uuid-validator";
import { LoggerHelper } from "../common/helpers/logging";
import { UserController } from "./user.controller";
import { UserModel } from "../common/model/user.model";


@Module({
    providers: [ResponseService, LoggerHelper, UserService, UserModel],
    controllers: [UserController],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UUIDValidator).forRoutes(UserController);
    }
}
