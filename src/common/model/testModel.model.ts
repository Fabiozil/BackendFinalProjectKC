import {
    DynamoDBClient,
    ScanCommand,
    PutItemCommand,
    DeleteItemCommand,
    UpdateItemCommand,
    QueryCommand,
} from "@aws-sdk/client-dynamodb";

export async function WriteDatabase() {
    const dynamoClient = new DynamoDBClient({ region: "us-east-1" });
    const scanCommand = new ScanCommand({
        TableName: "api-backend-kk-first-table",
    });

    const putCommand = new PutItemCommand({
        TableName: "api-backend-kk-first-table",
        Item: {
            id: { S: "Test-id" },
            name: { S: "FabioTest" },
            password: { S: "Fabio123" },
        },
    });

    await dynamoClient.send(putCommand);

    const response = await dynamoClient.send(scanCommand);
    console.log(response.Items);
    return response;
}
