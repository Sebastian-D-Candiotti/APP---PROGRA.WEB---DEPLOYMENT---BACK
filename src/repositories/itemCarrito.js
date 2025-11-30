import ItemCarrito from '../models/itemCarrito.js'
import RepositoryBase from './RepositoryBase.js'

class ItemCarritoRepository extends RepositoryBase {
    constructor() {
        super(ItemCarrito);
    }

    // Método específico para borrar un producto del carrito
    async removeFromCart(carritoId, productoId) {
        try {
            return await this.model.destroy({
                where: {
                    id_carrito: carritoId,
                    id_producto: productoId
                }
            });
        } catch(error) {
            console.error(error);
            return null;
        }
    }
    
    // Método para vaciar carrito (al comprar)
    async clearCart(carritoId) {
        try {
            return await this.model.destroy({
                where: { id_carrito: carritoId }
            });
        } catch(error) {
            console.error(error);
            return null;
        }
    }
}

export default new ItemCarritoRepository();