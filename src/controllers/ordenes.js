import repository from '../repositories/ordenes.js'
import ItemOrden from '../models/itemOrden.js';
import Orden from '../models/ordenes.js';

const findAll = async (req, res) => {
    const respuesta = await repository.findAll();
    return sendResults(respuesta, res, "No se encontraron órdenes.");
}

const findByUser = async (req, res) => {
    const userId = req.params.userId;
    const respuesta = await repository.findByUser(userId);
    return sendResults(respuesta, res, "No se encontraron órdenes para este usuario.");
}

const create = async (req, res) => {
  const { id_user, total, precio_productos, NroTarjeta, TipoTarjeta, estado, items } = req.body;

  if (!items || items.length === 0) {
      return res.status(400).json({ message: "La orden debe tener productos." });
  }

  try {
      // 1️⃣ Crear la orden
      const nuevaOrden = await Orden.create({ id_user, total, precio_productos, NroTarjeta, TipoTarjeta, estado });

      // 2️⃣ Crear los items de la orden
      const itemsOrden = items.map(item => ({
          id_orden: nuevaOrden.id,
          id_producto: item.id,
          cantidad: item.cantidad
      }));
      await ItemOrden.bulkCreate(itemsOrden);

      // 3️⃣ Recuperar los items para devolverlos
      const detalles = await ItemOrden.findAll({
          where: { id_orden: nuevaOrden.id },
          include: ['producto'] // si tienes relación con productos
      });

      res.status(201).json({ ...nuevaOrden.dataValues, detalles });

  } catch (error) {
      console.error("Error creando orden:", error);
      res.status(500).json({ message: "Error interno al crear la orden." });
  }
};

const sendResults = (result, res, message) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message })
}

const controller = { findAll, findByUser, create }

export default controller;