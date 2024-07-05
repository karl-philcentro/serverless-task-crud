import { DataTypes } from "sequelize";
import sequelize from "../db/db";

const Users = sequelize.define(
    'Users',
    {
        name: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'users_tb',
        timestamps: false,
    }
);


export default Users