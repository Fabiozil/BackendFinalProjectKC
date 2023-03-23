import {
    DynamoDBClient,
    PutItemCommand,
    ScanCommand,
    DeleteItemCommand,
    UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import { PostsCreate, PostsId, PostsUpdate } from "src/posts/dto/posts.dto";
import { v4 as uuidv4 } from "uuid";

export class PostsModel {
    public dynamoClient: DynamoDBClient;
    public s3Client: S3Client;

    constructor() {
        this.dynamoClient = new DynamoDBClient({ region: "us-east-1" });
        this.s3Client = new S3Client({
            region: "us-east-1",
            credentials: {
                secretAccessKey: process.env.SECRET_KEY,
                accessKeyId: process.env.ACCESS_KEY,
            },
        });
    }
    async getPosts(userId: string) {
        let command: ScanCommand;
        if (userId) {
            command = new ScanCommand({
                TableName: "api-backend-kk-posts",
                FilterExpression: "userId = :userId",
                ExpressionAttributeValues: {
                    ":userId": { S: userId },
                },
            });
        } else {
            command = new ScanCommand({ TableName: "api-backend-kk-posts" });
        }

        const response = await this.dynamoClient.send(command);

        return response;
    }

    async createPost(bodyParams: PostsCreate, photo, user) {
        const productId = uuidv4();
        console.log(photo);
        const uploadCommand = new PutObjectCommand({
            Bucket: `post-images-backend-kk`,
            Key: `${productId}-${photo.originalname}`,
            Body: photo.buffer,
        });

        const uploadResult = await this.s3Client.send(uploadCommand);
        console.log(uploadResult);

        const putCommand = new PutItemCommand({
            TableName: "api-backend-kk-posts",
            Item: {
                id: { S: productId },
                name: { S: bodyParams.name },
                createdAt: { S: `${new Date().toISOString()}` },
                sale: { BOOL: bodyParams.forSale },
                price: { S: `${bodyParams.price}` },
                photo: { S: `${productId}-${photo.originalname}` },
                userId: { S: user.id },
                userName: { S: user.username },
            },
        });
        await this.dynamoClient.send(putCommand);
        return;
    }

    async findPosts(id: PostsId) {
        const findCommand = new ScanCommand({
            TableName: "api-backend-kk-posts",
            FilterExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": { S: `${id}` },
            },
        });

        const productId = await this.dynamoClient.send(findCommand);

        return productId.Items;
    }

    async updatePosts(bodyParams: PostsUpdate, photo) {
        let updateExpression: string;
        let expressionAttributeValues: any;
        if (photo) {
            const uploadCommand = new PutObjectCommand({
                Bucket: `post-images-backend-kk`,
                Key: `${bodyParams.id}-${photo.originalname}`,
                Body: photo.buffer,
            });
            const uploadResult = await this.s3Client.send(uploadCommand);
            updateExpression = `SET #name=:name, sale=:sale, price=:price, photo=:photo`;
            expressionAttributeValues = {
                ":name": { S: `${bodyParams.name}` },
                ":sale": { S: `${bodyParams.sale}` },
                ":price": { S: `${bodyParams.price}` },
                ":photo": { S: `${bodyParams.id}-${photo.originalname}` },
            };
        } else {
            updateExpression = `SET #name=:name, sale=:sale, price=:price`;
            expressionAttributeValues = {
                ":name": { S: `${bodyParams.name}` },
                ":sale": { S: `${bodyParams.sale}` },
                ":price": { S: `${bodyParams.price}` },
            };
        }

        const command = new UpdateItemCommand({
            TableName: "api-backend-kk-posts",
            Key: {
                id: {
                    S: `${bodyParams.id}`,
                },
            },
            ExpressionAttributeNames: { "#name": "name" },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
        });

        return await this.dynamoClient.send(command);
    }

    async deletePost(queryParams: PostsId) {
        const deleteCommand = new DeleteItemCommand({
            TableName: "api-backend-kk-posts",
            Key: {
                id: {
                    S: `${queryParams.id}`,
                },
            },
        });

        return await this.dynamoClient.send(deleteCommand);
    }
}
