import { DataTypes } from "sequelize";
import sequelize from "../db/db";

import RentedBook from "./rentedBook";

const User = sequelize.define(
    'User',
    {
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
            type: DataTypes.ENUM("regular", "premium", "VIP"),
            defaultValue: "regular",
            allowNull: false,
        },
        rentalHistory: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            defaultValue: [],
        }
    },
    {
        tableName: 'users_tb',
        timestamps: true,
    }
);

User.hasMany(RentedBook, { foreignKey: 'userId' });

export default User