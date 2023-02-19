import { Body, Controller, Post } from '@nestjs/common';
import { v4 } from "uuid";
import {login} from "../DynamoDb/Tabala_user"
import { hashPassword } from './metodos/hashCrypto';

@Controller('sesion')
export class SesionController {

    @Post('login')
    async login(@Body() payload: any){

        const { name, password }: { name: string; password: string } = payload;
        const id = v4();
        const passwordHash = hashPassword(password)
        const params: any = { id, name, passwordHash };
     
       
        try {
          const result = login(params)
    
          return result
        
        } catch (error) {
          return error;
        }

    }
}
