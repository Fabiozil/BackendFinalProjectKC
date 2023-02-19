import * as AWS from "aws-sdk";

export async function login(date:any){
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const putParams = {
      TableName: "api-backend-kk-first-table",
      Item: date,
    };

    try {
        await dynamoDb.put(putParams).promise();
  
        return {
          statusCode: 201,
        };
      } catch (error) {
        return error;
      }
    
}