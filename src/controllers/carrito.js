import carritoRepo from '../repositories/carrito.js'
import itemRepo from '../repositories/itemCarrito.js'

// Obtener carrito del usuario (GET /carrito/:userId)
const getCart = async (req, res) => {
    const userId = req.params.userId;
    const result = await carritoRepo.findByUserId(userId);
    
    if (result) return res.status(200).json(result);
    else return res.status(500).json({ message: "Error al obtener carrito" });
}

// Agregar item al carrito (POST /carrito/add)
const addItem = async (req, res) => {
    const { id_user, id_producto } = req.body;
    
    // 1. Asegurarnos de tener el ID del carrito del usuario
    const carrito = await carritoRepo.findByUserId(id_user);
    if (!carrito) return res.status(500).json({ message: "Error al localizar carrito" });

    // 2. Agregar el item
    const nuevoItem = {
        id_carrito: carrito.id,
        id_producto: id_producto
    };
    
    const result = await itemRepo.create(nuevoItem);
    
    if (result) return res.status(200).json({ message: "Producto agregado", item: result });
    else return res.status(500).json({ message: "Error al agregar producto" });
}

// Quitar item del carrito (DELETE /carrito/remove)
const removeItem = async (req, res) => {
    const { id_user, id_producto } = req.body;

    const carrito = await carritoRepo.findByUserId(id_user);
    if (!carrito) return res.status(500).json({ message: "Error al localizar carrito" });

    const result = await itemRepo.removeFromCart(carrito.id, id_producto);
    
    if (result) return res.status(200).json({ message: "Producto eliminado" });
    else return res.status(500).json({ message: "Error al eliminar producto" });
}

// Vaciar carrito (DELETE /carrito/:userId/clear)
const clearCart = async (req, res) => {
    const userId = req.params.userId;
    const carrito = await carritoRepo.findByUserId(userId);
    
    if (carrito) {
        await itemRepo.clearCart(carrito.id);
        return res.status(200).json({ message: "Carrito vaciado" });
    }
    return res.status(500).json({ message: "Error al vaciar carrito" });
}

const controller = { getCart, addItem, removeItem, clearCart }

export default controller;