import type {
    APIGatewayProxyStructuredResultV2,
    APIGatewayProxyEventV2,
    Handler,
} from 'aws-lambda';

import Users from '../models/user';

export const handler: Handler = async (
    event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {

    const { name } = JSON.parse(event.body);

    await Users.create({
        name,
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `name: ${name}`,
        }),
    };
};
