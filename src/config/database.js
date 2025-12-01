import Sequelize from 'sequelize';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;

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
  console.log("🌐 Conectado a Neon (producción)");
} else {
  sequelize = new Sequelize(
    "tiendadb",
    "postgres",
    "sebas67",
    {
      host: "localhost",
      port: 5432,
      dialect: "postgres",
      logging: false,
    }
  );
  console.log("🖥 Conectado a PostgreSQL Local");
}

export default sequelize;
