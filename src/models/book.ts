import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from "../db/db";

interface BookAttributes {
    id?: number;
    author: string;
    title: string;
    description: string;
    quantity: number;
  }

  interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public id!: number;
  public author!: string;
  public title!: string;
  public description!: string;
  public quantity!: number;
}

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  sequelize,
  tableName: 'books_tb',
  timestamps: true,
});

// const Book = sequelize.define("Book", {
//     author: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     quantity: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0,
//     },
    
//     }, {
//         tableName: "books_tb",
//         timestamps: true,
//     }
// )

export default Book;