import app from './app.js'
import sequelize from './src/config/database.js'
import './src/models/asociations.js'

let dbConnected = false;

async function ensureDatabaseConnection() {
    if (!dbConnected) {
        try {
            await sequelize.authenticate();
            console.log('Conexión a la base de datos establecida correctamente');
            dbConnected = true;
        } catch (error) {
            console.error('Error conectando a la base de datos:', error);
            throw error;
        }
    }
}


async function main() {
    try {
        
        // Solo forzar sincronización (dropear y recrear tablas) cuando se pase
        // explícitamente un flag de inicialización. Evita que cualquier argumento
        // accidental provoque la regeneración de tablas.
        const args = process.argv.slice(2);
        const init = args.includes('init') || args.includes('-init') || args.includes('--init');

        if (init)
            await sequelize.sync({ force: true });
        else
            await sequelize.sync({ force: false });

        console.log('Base de datos Sincronizada!')

        const port = 3005;


        app.listen(port, () => {
            console.log('Server is running on port: ' + port)
        })  

    } catch (error) {
        console.log(error)        
    }

}

// Detectar si estamos en Vercel o desarrollo local
if (process.env.VERCEL) {
  // En Vercel, solo validar conexión (no sincronizar esquema)
  app.use(async (req, res, next) => {
    await ensureDatabaseConnection();
    next();
  });
} else {
  // En local, ejecutar el servidor normalmente
  main();
}

// Exportar para Vercel
export default app;





