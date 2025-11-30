import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const ItemCarrito = sequelize.define('item_carrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_carrito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'carrito_de_compras',
            key: 'id'
        }
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'productos',
            key: 'id'
        }
    }
})

export default ItemCarrito;