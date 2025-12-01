import express from 'express';
import productoRouter from './src/routes/producto.js';
import usuarioRouter from './src/routes/usuario.js';
import categoriasRouter from './src/routes/categorias.js';
import ordenesRouter from './src/routes/ordenes.js';
import carritoRouter from './src/routes/carrito.js';
// import tiendaRouter from './src/routes/tienda.js'
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: "Backend de Tienda Gamer funcionando 🚀",
    status: 200,
    vercel: !!process.env.VERCEL,
  });
});


app.use('/categoria', categoriasRouter);
app.use('/producto', productoRouter);
app.use('/auth', usuarioRouter);
app.use('/orden', ordenesRouter);
app.use('/carrito', carritoRouter);

export default app;