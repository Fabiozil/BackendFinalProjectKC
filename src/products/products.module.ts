
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { ProductsService } from "./products.service";
import { ResponseService } from "../common/helpers/response.service";
import { UUIDValidator } from "../common/middleware/uuid-validator";
import { LoggerHelper } from "../common/helpers/logging";
import { ProductsController } from "./products.controller";
import { UserModel } from "../common/model/user.model";



@Module({
    providers: [ResponseService, LoggerHelper, ProductsService, UserModel],
    controllers: [ProductsController],
})
export class ProductsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UUIDValidator).forRoutes(ProductsController);
    }
}