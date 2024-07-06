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
        const { rentalId } = event.pathParameters;

        const rentedBook = await db.RentedBook.findByPk(rentalId);

        if (!rentedBook) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "Rented book not found",
                }),
            };
        }

        // Delete the rentedBook from the rental history of all users
        const user = await db.User.findByPk(rentedBook.userId);
        if(user) {
            // Remove the rental history entry in the user's rental history
            const updateRentalHistory = user.rentalHistory.filter(entry => entry.rentedBookId !== rentedBook.id);
            await user.update({ rentalHistory: updateRentalHistory })
        }

        // Delete the rentedBook
        await rentedBook.destroy();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Book and related rental history deleted" }),
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
