import sequelizeDB from './databases/databases.js';
import Categoria from './models/categoriasModel.js';

const init = async () => {
  try {
    await sequelizeDB.authenticate();
    console.log('DB conectado. Creando tablas si no existen...');
    await sequelizeDB.sync({ alter: false });
    console.log('Sincronización completada.');
    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar DB:', error);
    process.exit(1);
  }
};

init();
