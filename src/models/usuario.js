import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const Usuario = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    fecharegistro:{
        type: DataTypes.DATE,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Usuario