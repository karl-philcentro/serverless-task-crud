import type {
    APIGatewayProxyStructuredResultV2,
    APIGatewayProxyEventV2,
    Handler,
} from 'aws-lambda';

import db from "../../db/initDB"

export const handler:Handler = async (
    event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
    try {
        const { title, description, author} = JSON.parse(event.body);

        const existing_book = await db.Book.findOne({
            where: { title },
        });

        if (existing_book) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Book already exists" }),
            };
        }
    
        const new_book = await db.Book.create({ title, description, author });

        return {
            statusCode: 201,
            body: JSON.stringify(new_book),
    };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
}