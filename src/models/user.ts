import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/db";

interface RentalHistoryEntry {
    rentedBookId: number;
    bookId: number;
    dateRented: Date;
    returnDate?: Date;
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

