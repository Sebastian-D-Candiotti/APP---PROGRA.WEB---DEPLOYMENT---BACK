import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

// Nombre de tabla explícito para coincidir con convenciones
const Carrito = sequelize.define('carrito_de_compras', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    }
})

export default Carrito;