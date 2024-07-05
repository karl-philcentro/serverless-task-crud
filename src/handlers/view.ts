import type { APIGatewayProxyStructuredResultV2, Handler } from 'aws-lambda';
import Users from '../models/user';

export const handler: Handler =
    async (): Promise<APIGatewayProxyStructuredResultV2> => {

        const useLists = await Users.findAll({
           
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: useLists,
            }),
        };
    };
