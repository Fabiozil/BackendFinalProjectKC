import {
    DynamoDBClient,
    PutItemCommand,
    ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { AuthLogin, AuthRegister } from "../../auth/dto/auth.dto";
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require("bcrypt");

export class UserModel {
    public dynamoClient: DynamoDBClient;

    constructor() {
        this.dynamoClient = new DynamoDBClient({ region: "us-east-1" });
    }

    async register(userData: AuthRegister) {
        const findCommand = new ScanCommand({
            TableName: "api-backend-kk-users",
            FilterExpression: "username = :username OR email = :email",
            ExpressionAttributeValues: {
                ":username": { S: userData.username },
                ":email": { S: userData.email },
            },
        });
        const existingUser = await this.dynamoClient.send(findCommand);

        if (existingUser.Items.length > 0) {
            throw new Error("Email or username already registered");
        }

        const encryptedPassword = await bcrypt.hash(userData.password, 10);

        const userId = uuidv4();
        const putCommand = new PutItemCommand({
            TableName: "api-backend-kk-users",
            Item: {
                id: { S: userId },
                username: { S: userData.username },
                email: { S: userData.email },
                password: { S: encryptedPassword },
            },
        });
        await this.dynamoClient.send(putCommand);

        return {
            id: userId,
            username: userData.username,
            email: userData.email,
        };
    }

    async login(userData: AuthLogin) {
        const findCommand = new ScanCommand({
            TableName: "api-backend-kk-users",
            FilterExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": { S: userData.email },
            },
        });

        const existingUser = await this.dynamoClient.send(findCommand);
        console.log(existingUser);

        if (existingUser.Items.length === 0) {
            throw new Error("Email not registered");
        }

        if (
            await bcrypt.compare(
                userData.password,
                existingUser.Items[0].password.S
            )
        ) {
            return {
                id: existingUser.Items[0].id.S,
                email: existingUser.Items[0].email.S,
                username: existingUser.Items[0].username.S,
            };
        } else {
            throw new Error("Email or password incorrect");
        }
    }
}
