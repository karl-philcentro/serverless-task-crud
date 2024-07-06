import type {
    APIGatewayProxyStructuredResultV2,
    APIGatewayProxyEventV2,
    Handler,
} from 'aws-lambda';

import db from "../../db/initDB"

export const handler:Handler = async (
    event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
    try {
        const { userId, bookId} = JSON.parse(event.body);

        const user = await db.User.findByPk(userId);

        if (!user) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "User not found" }),
            };
        }

        const book = await db.Book.findByPk(bookId);

        if (!book) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Book not found" }),
            };
        }

        const rented_book = await db.RentedBook.create({ userId, bookId});

        const rentalHistory = [...user.rentalHistory]

        rentalHistory.push({
            rentedBookId: rented_book.id,
            bookId,
            dateRented: rented_book.dateRented,
        });

        await user.update({ rentalHistory });

        return {
            statusCode: 201,
            body: JSON.stringify(rented_book),
    };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
}