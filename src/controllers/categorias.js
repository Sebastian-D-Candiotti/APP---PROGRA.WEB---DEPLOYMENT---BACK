import repository from '../repositories/categorias.js'

const findAll = async (req, res) => {
    const respuesta = await repository.findAll();

    return sendResults(respuesta, res, "No se han encontrado categorías.")

}



const findOne = async (req,res) => {
    const id = req.params.id;
    const result = await repository.findOne(id);

    return sendResults(result, res, "No se han encontrado categorías.")
}

const create = async (req,res) => {
    const object = req.body;
    const createdObj = await repository.create(object)

    return sendResults(createdObj, res, "Error al crear la categoría.")
}

const update = async (req,res) => {
    const object = req.body;
    const id = req.body.id;
    const updatedObj = await repository.update(id,object)

    return sendResults(updatedObj, res, "Error al actualizar la categoría.")
}

const remove = async (req,res) => {
    const id = req.params.id;
    const result = await repository.remove(id)

    return sendResults(result,res,"Error al eliminar la categoría.")
}

const sendResults = (result, res, message) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message })
}

const controller = { findAll, findOne, create,update,remove }

export default controller;   



