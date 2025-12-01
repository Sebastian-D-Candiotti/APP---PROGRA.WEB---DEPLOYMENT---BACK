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
    const { items, ...ordenData } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: "La orden debe tener productos." });
    }

    try {
        const nuevaOrden = await repository.createWithItems(ordenData, items);

        if (!nuevaOrden) {
            return res.status(500).json({ message: "Error al crear la orden." });
        }

        return res.status(200).json({ 
            message: "Orden creada correctamente",
            orden: nuevaOrden
        });
    } catch (error) {
        console.error("Error creando orden:", error);
        return res.status(500).json({ message: "Error interno al crear la orden." });
    }
}

const sendResults = (result, res, message) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message })
}

const controller = { findAll, findByUser, create }

export default controller;