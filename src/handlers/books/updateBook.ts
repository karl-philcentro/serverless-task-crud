import type {
    APIGatewayProxyStructuredResultV2,
    APIGatewayProxyEventV2,
    Handler,
} from 'aws-lambda';

import db from "../../db/initDB"

export const handler: Handler = async (
    event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
    try {
        const { id } = event.pathParameters;
        const data = JSON.parse(event.body);

        const book = await db.Book.findByPk(id);

        if (!book) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "Book not found",
                }),
            };
        }

        const updateFields = {}

        // Loop through the data object and only update the fields that are not undefined
        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined) {
            updateFields[key] = data[key];
            }
        });

        await book.update(updateFields);

        return {
            statusCode: 200,
            body: JSON.stringify(book),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Internal Server Error",
            }),
        };
    }
};