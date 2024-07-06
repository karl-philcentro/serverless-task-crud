import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/db";

import Book from "./book";

interface RentalHistoryEntry {
    rentedBookId: number;
    bookId: number;
    dateRented: Date;
    returnDate?: Date;

    Book?: { title: string };
}

interface UserAttributes {
id?: number;
name: string;
email: string;
role: 'regular' | 'premium' | 'VIP';
rentalHistory: RentalHistoryEntry[];
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'rentalHistory'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public role!: 'regular' | 'premium' | 'VIP';
  public rentalHistory!: RentalHistoryEntry[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Getter for currently rented books with titles
  public get activeRentals(): Promise<RentalHistoryEntry[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const currentDate = new Date();
            const rentedBooks: RentalHistoryEntry[] = this.rentalHistory
                .filter(entry => !entry.returnDate || entry.returnDate > currentDate);

            // Fetch Book titles asynchronously
            await Promise.all(rentedBooks.map(async (entry) => {
                if (entry.bookId) {
                    const book = await Book.findByPk(entry.bookId);
                    if (book) {
                        entry.Book = { title: book.title };
                    }
                }
            }));

            // Map to format the result with book titles
            const formattedRentedBooks = rentedBooks.map(entry => ({
                rentedBookId: entry.rentedBookId,
                bookId: entry.bookId,
                title: entry.Book ? entry.Book.title : '',
                dateRented: entry.dateRented,
                returnDate: entry.returnDate ? entry.returnDate : null,
            }));

            resolve(formattedRentedBooks);
        } catch (error) {
            reject(error);
        }
    });
}


}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM('regular', 'premium', 'VIP'),
    allowNull: false,
    defaultValue: 'regular',
  },
  rentalHistory: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    defaultValue: [],
  },
}, {
  sequelize,
  tableName: 'users_tb',
  timestamps: true,
});

export default User


// const User = sequelize.define(
//     'User',
//     {
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         role: {
//             type: DataTypes.ENUM("regular", "premium", "VIP"),
//             defaultValue: "regular",
//             allowNull: false,
//         },
//         rentalHistory: {
//             type: DataTypes.ARRAY(DataTypes.JSONB),
//             defaultValue: [],
//         }
//     },
//     {
//         tableName: 'users_tb',
//         timestamps: true,
//     }
// );

