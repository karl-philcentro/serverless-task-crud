import {
    APIGatewayProxyStructuredResultV2,
    Handler
    } from 'aws-lambda';

import db from "../../db/initDB"

export const handler: Handler = async (): Promise<APIGatewayProxyStructuredResultV2> => {

    const rentList = await db.RentedBook.findAll({});

    return {
        statusCode: 200,
        body: JSON.stringify(rentList),
    };
}

