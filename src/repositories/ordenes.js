import Orden from '../models/ordenes.js'
import ItemOrden from '../models/itemOrden.js'
import Producto from '../models/producto.js'
import Usuario from '../models/usuario.js'
import RepositoryBase from './RepositoryBase.js'

class OrdenesRepository extends RepositoryBase {
    constructor() {
        super(Orden);
    }

    async findAll() {
        try {
            return await this.model.findAll({
                include: [
                    { model: ItemOrden, as: 'detalles', include: [{ model: Producto, as: 'producto' }] },
                    { model: Usuario, as: 'usuario' }
                ],
                order: [['id', 'ASC']]
            });
        } catch (error) {
            console.error('Error repository.findAll (ordenes):', error);
            return null;
        }
    }

    async findByUser(userId) {
        try {
            return await this.model.findAll({
                where: { id_user: userId },
                include: [
                    { model: ItemOrden, as: 'detalles', include: [{ model: Producto, as: 'producto' }] },
                    { model: Usuario, as: 'usuario' }
                ],
                order: [['id', 'DESC']]
            });
        } catch (error) {
            console.error('Error repository.findByUser (ordenes):', error);
            return null;
        }
    }

    async createWithItems(ordenData, items) {
        const sequelize = this.model.sequelize;
        const t = await sequelize.transaction();
        try {
            const nuevaOrden = await this.model.create(ordenData, { transaction: t });

            const itemsToCreate = items.map(i => ({
                id_orden: nuevaOrden.id,
                id_producto: i.id || i.productoId || i.id_producto,
                cantidad: i.cantidad || i.qty || i.quantity || 1
            }));

            if (itemsToCreate.length > 0) {
                await ItemOrden.bulkCreate(itemsToCreate, { transaction: t });
            }

            await t.commit();

            // devolver la orden con detalles
            return await this.model.findOne({
                where: { id: nuevaOrden.id },
                include: [
                    { model: ItemOrden, as: 'detalles', include: [{ model: Producto, as: 'producto' }] },
                    { model: Usuario, as: 'usuario' }
                ]
            });
        } catch (error) {
            await t.rollback();
            console.error('Error repository.createWithItems (ordenes):', error);
            return null;
        }
    }
}

const repository = new OrdenesRepository();

export default repository;