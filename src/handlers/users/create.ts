import type {
    APIGatewayProxyStructuredResultV2,
    APIGatewayProxyEventV2,
    Handler,
} from 'aws-lambda';

import db from "../../db/initDB"

export const handler: Handler = async (
    event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {

    const { name, email} = JSON.parse(event.body);

    await db.User.create({
        name,
        email,
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `name: ${name}`,
        }),
    };
};
