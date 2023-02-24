import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "./user.service";
import { ResponseService } from "../common/helpers/response.service";
import { UUIDValidator } from "../common/middleware/uuid-validator";
import { LoggerHelper } from "../common/helpers/logging";
import { USerController } from "./user.controller";
import { WriteDatabaseAuth } from "../common/model/testModel.module";



@Module({
    imports:[JwtModule.registerAsync({
        useFactory: ()=>{
            return {
                secret:`${process.env.SECRET_KEY_JWT}`,
                signOptions:{
                    expiresIn:`${process.env.JWT_EXPIRATION_TIME}`,
                },
            }
        }
    })],
    providers: [ResponseService, LoggerHelper, UserService,WriteDatabaseAuth],
    controllers: [USerController],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UUIDValidator).forRoutes(USerController);
    }
}
