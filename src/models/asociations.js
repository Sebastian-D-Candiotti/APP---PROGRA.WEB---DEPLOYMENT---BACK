import Categorias from './categorias.js';
import Producto from './producto.js';
import Usuario from './usuario.js';
import Ordenes from './ordenes.js';
import ItemOrden from './itemOrden.js';
import Carrito from './carrito.js';
import ItemCarrito from './itemCarrito.js';

// Categorías → Productos
Categorias.hasMany(Producto, { foreignKey: 'categoria_id', as: 'productos' });
Producto.belongsTo(Categorias, { foreignKey: 'categoria_id', as: 'categoriaDetail' });

// Usuario → Carrito
Usuario.hasOne(Carrito, { foreignKey: 'id_user' });
Carrito.belongsTo(Usuario, { foreignKey: 'id_user' });

// Carrito → ItemCarrito
Carrito.hasMany(ItemCarrito, { foreignKey: 'id_carrito' });
ItemCarrito.belongsTo(Carrito, { foreignKey: 'id_carrito' });

// Producto → ItemCarrito
Producto.hasMany(ItemCarrito, { foreignKey: 'id_producto' });
ItemCarrito.belongsTo(Producto, { foreignKey: 'id_producto' });

// Usuario → Ordenes
Usuario.hasMany(Ordenes, { foreignKey: 'id_user' });
Ordenes.belongsTo(Usuario, { foreignKey: 'id_user' });

// Orden → ItemOrden
Ordenes.hasMany(ItemOrden, { foreignKey: 'id_orden' });
ItemOrden.belongsTo(Ordenes, { foreignKey: 'id_orden' });

// Producto → ItemOrden
Producto.hasMany(ItemOrden, { foreignKey: 'id_producto' });
ItemOrden.belongsTo(Producto, { foreignKey: 'id_producto' });
