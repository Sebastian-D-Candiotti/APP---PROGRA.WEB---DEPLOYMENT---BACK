import Sequelize from 'sequelize';
import pg from 'pg';

// Caso 1: Si estamos en producción (Vercel + Neon)
const connectionString = process.env.DATABASE_URL;

// Caso 2: Si estamos en local
const localConfig = {
  database: 'tiendadb',
  username: 'postgres',
  password: 'sebas67',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
};

let sequelize;

if (connectionString) {
  // 🔥 Modo Producción (Neon)
  sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    dialectModule: pg,
    ssl: true,
    dialectOptions: {
      ssl: { require: true }
    },
    logging: false
  });
  console.log("Conectando a Neon/PostgreSQL en modo producción...");
} else {
  // 🖥️ Modo Local
  sequelize = new Sequelize(
    localConfig.database,
    localConfig.username,
    localConfig.password,
    {
      host: localConfig.host,
      port: localConfig.port,
      dialect: localConfig.dialect,
      logging: false
    }
  );
  console.log("Conectando a PostgreSQL LOCAL...");
}

export default sequelize;
