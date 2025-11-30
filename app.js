import express from 'express';
import productoRouter from './src/routes/producto.js'
import usuarioRouter from './src/routes/usuario.js'
import categoriasRouter from './src/routes/categorias.js'
import ordenesRouter from './src/routes/ordenes.js'
import carritoRouter from './src/routes/carrito.js'
//import tiendaRouter from './src/routes/tienda.js'
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.use(bodyParser.json({ limit: '100mb' })); 
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


// Ruta base (IMPORTANTE PARA VERCEL)
app.get('/', (req, res) => {
    res.json({ mensaje: "API funcionando correctamente", status: 200 });
});


// Pagina categorias
app.use('/categoria', categoriasRouter)
app.use('/producto', productoRouter);
app.use('/auth', usuarioRouter);
app.use('/orden', ordenesRouter);
app.use('/carrito', carritoRouter);
export default app