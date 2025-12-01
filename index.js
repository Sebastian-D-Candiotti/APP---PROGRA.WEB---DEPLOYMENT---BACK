import dotenv from "dotenv";
dotenv.config();

import app from './app.js';
import sequelize from './src/config/database.js';
import './src/models/asociations.js';

// -------------------------------------------
// 🔐 Conexión para Vercel (solo autenticar)
// -------------------------------------------
let dbConnected = false;

async function ensureDatabaseConnection() {
    if (!dbConnected) {
        try {
            await sequelize.authenticate();
            console.log("✔ Conexión establecida con la base de datos (Neon/Vercel)");
            dbConnected = true;
        } catch (error) {
            console.error("❌ Error conectando a la base de datos:", error);
            throw error;
        }
    }
}

// -------------------------------------------
// 🚀 MODO LOCAL
// -------------------------------------------
async function main() {
    try {
        const args = process.argv.slice(2);
        const init =
            args.includes('init') ||
            args.includes('-init') ||
            args.includes('--init');

        if (init)
            await sequelize.sync({ force: true });
        else
            await sequelize.sync({ force: false });

        console.log('✔ Base de datos sincronizada (LOCAL)');

        const port = 3005; // ⬅️ PUERTO FIJO EN LOCAL
        app.listen(port, () =>
            console.log('Servidor corriendo en puerto: ' + port)
        );

    } catch (error) {
        console.log(error);
    }
}

// -------------------------------------------
// 🔍 Detectar si estamos en Vercel
// -------------------------------------------
if (process.env.VERCEL) {
    console.log("🌐 Ejecutando en Vercel (NO sincroniza BD)");

    app.use(async (req, res, next) => {
        await ensureDatabaseConnection(); // solo autentica
        next();
    });

} else {
    console.log("💻 Ejecutando LOCAL en puerto 3005");
    main();
}

// Obligatorio para Vercel
export default app;
