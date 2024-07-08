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
        const { name, email, role} = JSON.parse(event.body);

        const new_user = await db.User.create({
            name,
            email,
            role
        });

        return {
            statusCode: 201,
            body: JSON.stringify(new_user),
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
