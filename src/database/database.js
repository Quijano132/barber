// En database.js
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('bs8azajrxpe1vqvwikfd', 'u491885106_root', '9BUse6PUbqzlJU9Abc6q', {
  host: 'bs8azajrxpe1vqvwikfd-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  connectTimeout: 60000,
});



export const getConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
    return sequelize;
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    throw error;
  }
};
