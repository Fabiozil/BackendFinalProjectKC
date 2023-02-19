import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TestModule } from "./test/test.module";
import { SesionController } from './sesion/sesion.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`, //${process.env.NODE_ENV}
            isGlobal: true,
        }),
        TestModule,
    ],
    controllers: [AppController, SesionController],
    providers: [AppService],
})
export class AppModule {}
