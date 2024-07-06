
import sequelize from '../db/db';
import User from './../models/user';
import Book from './../models/book';
import RentedBook from './../models/rentedBook';

// Define associations
User.hasMany(RentedBook, { foreignKey: 'userId', onDelete: 'CASCADE' });
Book.hasMany(RentedBook, { foreignKey: 'bookId', onDelete: 'CASCADE'});
RentedBook.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE'});
RentedBook.belongsTo(Book, { foreignKey: 'bookId', onDelete: 'CASCADE'});

const db = {
  sequelize,
  User,
  Book,
  RentedBook,
};

db.sequelize.authenticate()
  .then(async () => {
    console.log('Connection has been established successfully.');
    await db.sequelize.sync({ alter: true }); // Use alter: true to update tables to match the models
    console.log('All models were synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


export default db;
