// En database.js
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('barberia', 'root', 'Quijano123.', {
  host: 'localhost',
  dialect: 'mysql'
});

const main = async () => {
  try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
      // Resto del código
  } catch (error) {
      console.error('Unable to connect to the database:', error.message);
  }
};

main();
