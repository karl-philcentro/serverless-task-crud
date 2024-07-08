import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Handler } from 'aws-lambda';
import db from "../../db/initDB"

export const handler: Handler =
    async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {
        try {
            const { id } = event.pathParameters

            const user = await db.User.findByPk(id); 

            const currentRentals = await user.activeRentals

            return {
                statusCode: 200,
                body: JSON.stringify({
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        activeRentals: currentRentals
                    }
                }),
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
