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
        console.log("🚀 ~ file: pruducts.model.ts:42 ~ ProductsModel ~ findProducts ~ id:", id)
        
        const findCommand = new ScanCommand({
            TableName: "api-backend-kk-posts",
            FilterExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": { S: id },
            },
        });

        const productId = await this.dynamoClient.send(findCommand);
        console.log("🚀 ~ file: pruducts.model.ts:51 ~ ProductsModel ~ findProducts ~ productId:", productId)
        
        return productId.Items
    }

    async updateProducts(bodyParams){
    console.log("🚀 ~ file: pruducts.model.ts:58 ~ ProductsModel ~ updateProducts ~ bodyParams:", bodyParams)

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
       
        

        await this.dynamoClient.send(update);
       

    }

    async deletedProducts(id){

       const deleteCommand = new DeleteItemCommand({
        TableName: "api-backend-kk-posts",
        Key:{
            ":id": { S: id }
        },
        ExpressionAttributeValues:{
            id: { S: id }
        }, 
        ConditionExpression:"attribute_exists"

       });

        
       await this.dynamoClient.send(deleteCommand);
    }

    
}
