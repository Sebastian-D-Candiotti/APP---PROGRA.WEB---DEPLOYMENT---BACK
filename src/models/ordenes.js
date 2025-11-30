import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const Ordenes = sequelize.define('ordenes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    idp: { // ID de pago
        type: DataTypes.INTEGER,
        allowNull: true
    },
    total: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    precio_productos: { // Nuevo campo según diagrama
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    NroTarjeta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    TipoTarjeta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    // Llave foránea hacia Usuario
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    }
})

export default Ordenes;