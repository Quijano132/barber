// En database.js
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('barberia', 'root', 'Quijano123.', {
  host: 'localhost',
  dialect: 'mysql'
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
