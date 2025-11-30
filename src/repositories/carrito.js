import Carrito from '../models/carrito.js'
import ItemCarrito from '../models/itemCarrito.js'
import Producto from '../models/producto.js'
import RepositoryBase from './RepositoryBase.js'

class CarritoRepository extends RepositoryBase {
    constructor() {
        super(Carrito);
    }

    // Buscar el carrito de un usuario y traer sus productos
    async findByUserId(userId) {
        try {
            // Buscamos si ya tiene carrito
            let carrito = await this.model.findOne({
                where: { id_user: userId },
                include: [{
                    model: ItemCarrito,
                    as: 'items',
                    include: [{
                        model: Producto,
                        as: 'productoInfo'
                    }]
                }]
            });

            // Si no tiene, lo creamos vacío al vuelo
            if (!carrito) {
                carrito = await this.model.create({ id_user: userId });
                // Recargamos para traer la estructura de items vacía
                return await this.findByUserId(userId);
            }

            return carrito;
        } catch(error) {
            console.error(error);
            return null;
        }
    }
}

export default new CarritoRepository();