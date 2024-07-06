import {
    APIGatewayProxyStructuredResultV2,
    Handler
    } from 'aws-lambda';

import db from "../../db/initDB"

interface FormattedRentedBook {
    id: number;
    user: {
        userId: number;
        userName: string | null;
    };
    book: {
        bookId: number;
        bookTitle: string | null;
    };
    dateRented: Date;
    returnDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export const handler: Handler = async (): Promise<APIGatewayProxyStructuredResultV2> => {
    try {
        const rentedBooks = await db.RentedBook.findAll({
            include: [
                {
                    model: db.User,
                    attributes: ['id','name']
                },
                {
                    model: db.Book,
                    attributes: ['id','title']
                }
            ]
            })

            const formattedRentedBooks: FormattedRentedBook[] = rentedBooks.map(rentedBook => {
                const { id, userId, bookId, dateRented, returnDate, createdAt, updatedAt } = rentedBook;
                const userName = rentedBook.User ? rentedBook.User.name : null;
                const bookTitle = rentedBook.Book ? rentedBook.Book.title : null;

                return { 
                    id, 
                    user: { userId, userName}, 
                    book: { bookId, bookTitle}, 
                    dateRented, 
                    returnDate, 
                    createdAt, 
                    updatedAt 
                }
            })

            return {
                statusCode: 200,
                body: JSON.stringify(formattedRentedBooks),
            };
        } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
}