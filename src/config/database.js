import Sequelize from 'sequelize';
import pg from 'pg';

// Variables para local o Vercel
const hostname = process.env.DB_HOST || 'localhost';
const username = process.env.DB_USERNAME || 'postgres';
const password = process.env.DB_PASSWORD || 'sebas67';
const database = process.env.DB_NAME || 'tiendadb';
const port = process.env.DB_PORT || 5432;

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port: port,
    dialect: 'postgres',
    dialectModule: pg, // OBLIGATORIO en Vercel
    logging: false, // limpia la consola

    // SSL solo cuando estamos en Vercel o BD en la nube
    dialectOptions: process.env.VERCEL
        ? {
              ssl: {
                  require: true,
                  rejectUnauthorized: false,
              },
          }
        : {},
});

export default sequelize;
