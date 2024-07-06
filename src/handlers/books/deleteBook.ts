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
        const { id } = event.pathParameters;

        const book = await db.Book.findByPk(id);

        if (!book) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "Book not found",
                }),
            };
        }

        const rentedBooks = await db.RentedBook.findAll({ where: { bookId: id } });

        // Delete the book from the rental history of all users
        for (const rentedBook of rentedBooks) {
            const user = await db.User.findByPk(rentedBook.userId);
            if(user) {
                // Remove the rental history entry in the user's rental history
                const updateRentalHistory = user.rentalHistory.filter(entry => entry.rentedBookId !== rentedBook.id);
                await user.update({ rentalHistory: updateRentalHistory })
            }
        }

        // Delete the book
        await book.destroy();

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
