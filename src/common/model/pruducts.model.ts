import {
    DynamoDBClient,
    PutItemCommand,
    ScanCommand,
    DeleteItemCommand,
    UpdateItemCommand,

} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';


export class ProductsModel {
    public dynamoClient: DynamoDBClient;

    constructor() {
        this.dynamoClient = new DynamoDBClient({ region: "us-east-1" });
    }
    async products(){

    }

    async createProduct(bodyParams){
        console.log("🚀 ~ file: pruducts.model.ts:17 ~ ProductsModel ~ createProduct ~ bodyParams:", bodyParams)
        const productId = uuidv4();

        const putCommand = new PutItemCommand({
            TableName: "api-backend-kk-posts",
            Item: {
                id: { S: productId },
                name: { S: bodyParams.name },
                createdAt: { S: bodyParams.createdAt },
                sale: { S: bodyParams.sale },
                price: { S: bodyParams.price },
                photo: { S: bodyParams.photo },
            },
        });
        await this.dynamoClient.send(putCommand);
        return
    }

    async findProducts(id){
        const findCommand = new ScanCommand({
            TableName: "api-backend-kk-posts",
            FilterExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": { S: id },
            },
        });

        const productId = await this.dynamoClient.send(findCommand);
        return productId
    }

    async updateProducts(bodyParams){

        const update = new UpdateItemCommand({
            TableName: "api-backend-kk-posts",
            Key:{
                ":id": { S: bodyParams.id }
            },
            ExpressionAttributeValues:{
                id: { S: bodyParams.id },
                name: { S: bodyParams.name },
                createdAt: { S: bodyParams.createdAt },
                sale: { S: bodyParams.sale },
                price: { S: bodyParams.price },
                photo: { S: bodyParams.photo },
            },
        });
        

        const productId = await this.dynamoClient.send(update);
        return productId


    }

    async deletedProducts(id){

       const deleteCommand = new DeleteItemCommand({
        TableName: "api-backend-kk-posts",
        Key:{
            ":id": { S: id }
        },
       });

        
       await this.dynamoClient.send(deleteCommand);

        return 

    }

    
}
