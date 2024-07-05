import { DataTypes } from "sequelize";
import sequelize from "../db/db";

const Book = sequelize.define("Book", {
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
        defaultValue: 0,
    },
    
    }, {
        tableName: "books_tb",
        timestamps: true,
    }
)

export default Book;