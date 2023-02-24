import {
    DynamoDBClient,
    ScanCommand,
    PutItemCommand,
    DeleteItemCommand,
    UpdateItemCommand,
    QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { CreateUserDto } from "../../user/user.dto";




@Injectable()
export class WriteDatabaseAuth{

     private dynamoClient = new DynamoDBClient({ region: "us-east-1" });


    async CreateUser(data:any) {
          
        const putCommand = new PutItemCommand({
            TableName: "api-backend-kk-first-table",
            Item: {
                    id: { S: data.id },
                    email: { S: data.email },
                    password: { S: data.password},
                }
        });
        
        try {
            
            await this.dynamoClient.send(putCommand);
            return data
          
        } catch (error) {
            throw new UnauthorizedException('server error')
        }
       
    }

    async EmailFind(email:string){
        // buscar el id y devolverlo si lo econtro 
        // remplazar el false para vericicar si es verdad 
        const filter ={
                    email: { S: email }
                }
        


        //const command = new ScanCommand(filter);        
        if (false){
            throw new UnauthorizedException('the email is in use.')
        }


        return true

    }

    
}



// export async function WriteDatabase() {
//     const dynamoClient = new DynamoDBClient({ region: "us-east-1" });

//     const scanCommand = new ScanCommand({
//         TableName: "api-backend-kk-first-table",
//     });

//     const putCommand = new PutItemCommand({
//         TableName: "api-backend-kk-first-table",
//         Item: {
//             id: { S: "Test-id" },
//             name: { S: "FabioTest" },
//             password: { S: "Fabio123" },
//         },
//     });

//     await dynamoClient.send(putCommand);

//     const response = await dynamoClient.send(scanCommand);
//     console.log(response.Items);
//     return response;
// }
