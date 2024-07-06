import type {
    APIGatewayProxyStructuredResultV2,
    APIGatewayProxyEventV2,
    Handler,
} from 'aws-lambda';

import db from "../../db/initDB"

export const handler: Handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {
    try {
        const { rentalId } = event.pathParameters

        const rentedBook = await db.RentedBook.findByPk(rentalId);
        const user = await db.User.findByPk(rentedBook.userId);

        if (!rentedBook) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "Rental not found",
                }),
            };
        }

        const updatedBook = await db.Book.findByPk(rentedBook.bookId)

        await updatedBook.update({
            quantity: updatedBook.quantity + 1
        })

        await rentedBook.update({
            returnDate: new Date()
        })

        const updatedRentalHistory = user.rentalHistory.map(entry => {
            if (entry.rentedBookId === rentedBook.id) {
                return {
                    ...entry,
                    returnDate: rentedBook.returnDate
                }
            }
            return entry
        })

        await user.update({
            rentalHistory: updatedRentalHistory
        })

        return {
            statusCode: 200,
            body: JSON.stringify(rentedBook),
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
