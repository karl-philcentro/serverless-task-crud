import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432, // PostgreSQL default port
    dialect: 'postgres', // Specify the dialect of the database
  });

sequelize.authenticate()
  .then(async () => {
    console.log('Connection has been established successfully.');
    // Synchronize all models
    await sequelize.sync({ alter: true }); // Use alter: true to update tables to match the models
    console.log('All models were synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  export default sequelize;