const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const dynamoDBTableName = 'todolist-dynamodb';

exports.handler = async (event, context) => {
	let body;
	let statusCode = 200;
	const headers = {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Credentials": true
	};
	console.log(event);
	
	try {
		switch (event.httpMethod+" "+event.resource) {
			
            case "PUT /items":
				let requestJSON = JSON.parse(event.body);
				await dynamo
					.put({
						TableName: dynamoDBTableName,
						Item: {
							id: requestJSON.id,
							title: requestJSON.title,
							completed: requestJSON.completed
						}
					})
					.promise();
				body = `Put item ${requestJSON.id}`;
				console.log(JSON.parse(event.body));
				break;

			case "GET /items/{id}":
				body = await dynamo
					.get({
						TableName: dynamoDBTableName,
						Key: {
						  id: event.pathParameters.id
						}
					})
					.promise();
				body = JSON.stringify(body);
				console.log(body);
				break;
				
			case "DELETE /items/{id}":
				await dynamo
					.delete({
						TableName: dynamoDBTableName,
						Key: {
							id: event.pathParameters.id
						}
					})
					.promise();
				body = `Deleted item ${event.pathParameters.id}`;
				break;
			
			case "GET /items":
				body = await dynamo.scan({ TableName: dynamoDBTableName }).promise();
				body = JSON.stringify(body);
				console.log(body);
				break;

			default:
				throw new Error(`Unsupported route: "${event.routeKey}"`);
		}
	} catch (err) {
		statusCode = 400;
		body = err.message;
	}

	return {
		statusCode,
		body,
	    headers
	};
};