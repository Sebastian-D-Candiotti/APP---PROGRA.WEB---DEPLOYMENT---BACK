import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const Categorias = sequelize.define('categorias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ruta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Categorias;