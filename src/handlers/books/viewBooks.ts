import type {
    APIGatewayProxyStructuredResultV2,
    APIGatewayProxyEventV2,
    Handler,
} from 'aws-lambda';

import { Op } from 'sequelize';

import db from "../../db/initDB"

export const handler: Handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {
    try {
        const bookQuery = JSON.parse(event.body);

        let searchCriteria = {}

        if (bookQuery.author || bookQuery.title) {
            searchCriteria = {
                where: {
                    [Op.or]: [
                        bookQuery.author ? {
                            author: {
                                [Op.iLike]: `%${bookQuery.author}%`
                            }
                        } : null,
                        bookQuery.title ? {
                            title: {
                                [Op.iLike]: `%${bookQuery.title}%`
                            }
                        } : null
                    ].filter(Boolean)
                }
            }
        }

        const booksList = await db.Book.findAll(searchCriteria);
    
        return {
            statusCode: 200,
            body: JSON.stringify(booksList),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Internal Server Error",
            }),
        };
    
    }

    
}

