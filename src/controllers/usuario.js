import usuarioService from "../services/usuario.js";
import repository from "../repositories/usuario.js";

const registrar = async (req,res) => {
    try {
        const { nombre, correo, password, dni, img,estado,fechaRegistro,rol} = req.body;

        const result = await usuarioService.registrar({
            nombre,
            correo,
            password,
            dni,
            img,
            estado,
            fechaRegistro,
            rol
        });

        if(!result||!result.success){
            return res.status(400).json(result);
        }

        return res.status(201).json(result);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error inesperado", error})
    }
}

const login = async(req,res) => {

    try {
        const {correo, password } = req.body;

        const result = await usuarioService.login({
            usuario: correo,
            password
        });

        if (!result || !result.success) {
                return res.status(400).json(result);
            }

            return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error inesperado", error });
    }
}


const findAll = async (req, res) => {
    const result = await repository.findAll();
    return sendResults(result, res, "No se han encontrado registros.")
}

const findOne = async (req,res) => {
    const id = req.params.id;
    const result = await repository.findOne(id);
    return sendResults(result, res, "No se han encontrado registros.")
}

const findByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await repository.findByEmail(email);
        
        console.log("DEBUG CONTROLLER: Usuario recibido del Repository (Valor y Tipo):", typeof user, user);

        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado con ese correo." });
        }
        
        return res.status(200).json({ success: true, user: { id: user.id, correo: user.correo } });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error inesperado al buscar por correo", error });
    }
}

const resetPassword = async (req, res) => {
    try {
     
        const { userId, newPassword } = req.body;
        
        const result = await usuarioService.resetPassword(userId, newPassword);

        if (!result || !result.success) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error inesperado al restablecer la contraseña", error });
    }
}

const create = async (req,res) => {
    const obj = await repository.create(req.body);
    return sendResults(obj, res, "Error al crear el objeto.")
}

const update = async (req,res) => {
    const { id } = req.body;
    const obj = await repository.update(id, req.body);
    return sendResults(obj, res, "Error al actualizar el objeto.");
}

const remove = async (req,res) => {
    const id = req.params.id;
    const result = await repository.remove(id)

    return sendResults(result,res,"Error al eliminar el objeto.")
}

const sendResults = (result, res, message) => {
    if (result) return res.status(200).json(result);
    return res.status(500).json({ message });
}

const controller = { registrar,login,findAll,findOne,remove,update, findByEmail, resetPassword}

export default controller