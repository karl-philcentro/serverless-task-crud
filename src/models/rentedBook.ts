import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import sequelize from "../db/db";

interface RentedBookAttributes {
    id?: number;
    userId: number;
    bookId: number;
    dateRented: Date;
    returnDate?: Date;
  }

  interface RentedBookCreationAttributes extends Optional<RentedBookAttributes, 'id' | 'returnDate'> {}

class RentedBook extends Model<RentedBookAttributes, RentedBookCreationAttributes> implements RentedBookAttributes {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public dateRented!: Date;
  public returnDate?: Date;
}

RentedBook.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dateRented: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  },
  returnDate: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  tableName: 'rented_books_tb',
  timestamps: true,
});


// const RentedBook = sequelize.define("RentedBook", {
//     dateRented: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.fn('now'),
//     },
//     returnDate: {
//         type: DataTypes.DATE,
//     },
//     }, {
//         tableName: "rented_books_tb",
//         timestamps: true,
//     }
// )

export default RentedBook;