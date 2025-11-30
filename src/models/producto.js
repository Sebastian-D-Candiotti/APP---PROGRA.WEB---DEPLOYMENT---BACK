import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const Producto = sequelize.define('producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descuento:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    presentacion:{
        type: DataTypes.STRING,
        allowNull: false
    },
     categoria_id: {
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'categorias',
            key:'id'
        }
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    genero:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

export default Producto;