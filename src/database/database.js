// En database.js
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('u491885106_barberia', 'u491885106_root', 'Quijano123.', {
  host: 'https://auth-db805.hstgr.io/index.php?route=/database/structure&server=1&db=u491885106_barberia',
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
