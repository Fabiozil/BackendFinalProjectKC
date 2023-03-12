import {
    DynamoDBClient,
    PutItemCommand,
    ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { UserRegister } from "../../user/dto/user.dto";
import bcrypt from "bcrypt";

export class UserModel {
    public dynamoClient: DynamoDBClient;

    constructor() {
        this.dynamoClient = new DynamoDBClient({ region: "us-east-1" });
    }

    async register(userData: UserRegister) {
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

        const putCommand = new PutItemCommand({
            TableName: "api-backend-kk-users",
            Item: {
                username: { S: userData.username },
                email: { S: userData.email },
                password: { S: encryptedPassword },
            },
        });
        const createdUser = await this.dynamoClient.send(putCommand);
        console.log(createdUser);
        return {
            id: "",
            username: userData.username,
            email: userData.email,
            password: encryptedPassword,
        };
    }
}
