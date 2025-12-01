import Sequelize from 'sequelize';
import pg from 'pg';

// Si estás en producción (Vercel) existirá DATABASE_URL
const connectionString = process.env.DATABASE_URL;

// Configuración local (tu PostgreSQL en tu PC)
const localConfig = {
  database: process.env.DB_NAME || "tiendadb",
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'sebas67',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres'
};

let sequelize;

if (connectionString) {

  sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    dialectModule: pg,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });

  console.log("🌐 Conectado a Neon/PostgreSQL (PRODUCCIÓN)");
} else {

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

  console.log("🖥️ Conectado a PostgreSQL LOCAL");
}

export default sequelize;