import repository from '../repositories/ordenes.js'

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
    // Esperamos recibir: { ...datosOrden, items: [{id_producto, cantidad, etc}] }
    const { items, ...ordenData } = req.body;
    
    if (!items || items.length === 0) {
        return res.status(400).json({ message: "La orden debe tener productos." });
    }

    const createdObj = await repository.createWithItems(ordenData, items);
    return sendResults(createdObj, res, "Error al crear la orden.");
}

const sendResults = (result, res, message) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message })
}

const controller = { findAll, findByUser, create }

export default controller;