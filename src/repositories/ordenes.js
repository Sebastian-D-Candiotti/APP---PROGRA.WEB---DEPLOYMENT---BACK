import Ordenes from '../models/ordenes.js'
import ItemOrden from '../models/itemOrden.js'
import Producto from '../models/producto.js'
import Usuario from '../models/usuario.js'
import RepositoryBase from './RepositoryBase.js'

class OrdenesRepository extends RepositoryBase {
    constructor() {
        super(Ordenes);
    }

    // Sobreescribimos findAll para traer los detalles y los productos
    async findAll() {
        try {
            return await this.model.findAll({
                include: [
                    {
                        model: ItemOrden,
                        as: 'detalles',
                        include: [{
                            model: Producto,
                            as: 'producto'
                        }]
                    },
                    {
                        model: Usuario,
                        as: 'usuario',
                        attributes: ['nombre']
                    }
                ],
                order: [['fecha', 'DESC']]
            });
        } catch(error) {
            console.error(error);
            return null;
        }
    }

    // Buscar ordenes de un usuario específico
    async findByUser(userId) {
        try {
            return await this.model.findAll({
                where: { id_user: userId },
                include: [
                    {
                        model: ItemOrden,
                        as: 'detalles',
                        include: [{
                            model: Producto,
                            as: 'producto'
                        }]
                    },
                    {
                        model: Usuario,
                        as: 'usuario',
                        attributes: ['id', 'nombre']
                    }
                ],
                order: [['fecha', 'DESC']]
            });
        } catch(error) {
            console.error(error);
            return null;
        }
    }

    async createWithItems(ordenData, itemsData) {
        try {
            // Crear la orden primero
            const nuevaOrden = await this.model.create(ordenData);
            
            // Preparar los items con el ID de la orden recién creada
            const itemsConId = itemsData.map(item => ({
                ...item,
                id_orden: nuevaOrden.id
            }));

            // Insertar los items en bulk
            await ItemOrden.bulkCreate(itemsConId);

            return nuevaOrden;
        } catch(error) {
            console.error("Error al crear orden con items:", error);
            return null;
        }
    }
}

export default new OrdenesRepository();