
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ResponseService } from "../common/helpers/response.service";
import { UUIDValidator } from "../common/middleware/uuid-validator";
import { LoggerHelper } from "../common/helpers/logging";
import { AuthController } from "./auth.controller";
import { UserModel } from "../common/model/user.model";
import { VerifyToken } from "../common/middleware/auth-validator";


@Module({
    providers: [ResponseService, LoggerHelper, AuthService, UserModel],
    controllers: [AuthController],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UUIDValidator).forRoutes(AuthController);
    }
}


