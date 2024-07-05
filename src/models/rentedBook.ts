import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db/db";

const RentedBook = sequelize.define("RentedBook", {
    dateRented: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: false,
  
    },
    }, {
        tableName: "rented_books_tb",
        timestamps: true,
    }
)

export default RentedBook;