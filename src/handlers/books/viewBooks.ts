import {
    APIGatewayProxyStructuredResultV2,
    Handler
    } from 'aws-lambda';

import db from "../../db/initDB"

export const handler: Handler = async (): Promise<APIGatewayProxyStructuredResultV2> => {

    const booksList = await db.Book.findAll({});

    return {
        statusCode: 200,
        body: JSON.stringify(booksList),
    };
}

