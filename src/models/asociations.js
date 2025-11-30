import Categorias from './categorias.js';
import Producto from './producto.js';
import Usuario from './usuario.js';
import Ordenes from './ordenes.js';
import ItemOrden from './itemOrden.js';
import Carrito from './carrito.js';
import ItemCarrito from './itemCarrito.js';

// --- RELACIONES PRODUCTO - CATEGORIA ---
// 1. Una Categoría tiene muchos Productos
Categorias.hasMany(Producto, { 
    foreignKey: 'categoria_id', 
    as: 'productos' 
});
// 2. Un Producto pertenece a una Categoría
Producto.belongsTo(Categorias, { 
    foreignKey: 'categoria_id', 
    as: 'categoriaDetail' 
});

// --- RELACIONES ORDENES (Usuario <-> Ordenes) ---
// 3. Un Usuario tiene muchas Ordenes
Usuario.hasMany(Ordenes, { 
    foreignKey: 'id_user', 
    as: 'misOrdenes' 
});
// 4. Una Orden pertenece a un Usuario
Ordenes.belongsTo(Usuario, { 
    foreignKey: 'id_user', 
    as: 'usuario' 
});

// --- RELACIONES DETALLE ORDEN (Orden <-> ItemOrden <-> Producto) ---
// 5. Una Orden tiene muchos Items (Detalle)
Ordenes.hasMany(ItemOrden, { 
    foreignKey: 'id_orden', 
    as: 'detalles' 
});
// 6. Un Item de Orden pertenece a una Orden específica
ItemOrden.belongsTo(Ordenes, { 
    foreignKey: 'id_orden', 
    as: 'orden' 
});

// 7. Un Producto puede estar en muchos Items de Orden (en muchas compras diferentes)
Producto.hasMany(ItemOrden, { 
    foreignKey: 'id_producto', 
    as: 'ventasRealizadas' 
});
// 8. Un Item de Orden se refiere a un Producto específico
ItemOrden.belongsTo(Producto, { 
    foreignKey: 'id_producto', 
    as: 'producto' 
});

// --- RELACIONES CARRITO (Usuario <-> Carrito) ---
// 9. Un Usuario tiene UN Carrito (Relación 1 a 1)
Usuario.hasOne(Carrito, { 
    foreignKey: 'id_user', 
    as: 'miCarrito' 
});
// 10. Un Carrito pertenece a un Usuario
Carrito.belongsTo(Usuario, { 
    foreignKey: 'id_user', 
    as: 'dueno' 
});

// --- RELACIONES DETALLE CARRITO (Carrito <-> ItemCarrito <-> Producto) ---
// 11. Un Carrito tiene muchos Items
Carrito.hasMany(ItemCarrito, { 
    foreignKey: 'id_carrito', 
    as: 'items' 
});
// 12. Un Item de Carrito pertenece a un Carrito
ItemCarrito.belongsTo(Carrito, { 
    foreignKey: 'id_carrito', 
    as: 'carrito' 
});

// 13. Un Producto puede estar en muchos Carritos (como items)
Producto.hasMany(ItemCarrito, { 
    foreignKey: 'id_producto', 
    as: 'enCarritos' 
});
// 14. Un Item de Carrito se refiere a un Producto
ItemCarrito.belongsTo(Producto, { 
    foreignKey: 'id_producto', 
    as: 'productoInfo' 
});