import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const ItemOrden = sequelize.define('item_orden', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // FK hacia Ordenes
    id_orden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ordenes',
            key: 'id'
        }
    },
    // FK hacia Producto
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'productos',
            key: 'id'
        }
    }
})

export default ItemOrden;