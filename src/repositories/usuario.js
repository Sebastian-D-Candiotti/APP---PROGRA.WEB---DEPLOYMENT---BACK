import model from '../models/usuario.js'
import RepositoryBase from './RepositoryBase.js'

const repository = new RepositoryBase(model);

repository.findByEmail = async function (correo) {
    try {
        return await model.findOne({
            where: {correo},
            attributes: [
                'id', 
                'nombre', 
                'correo', 
                'password',
                'rol',
                'dni',
                'img',
                'estado',
                'fecharegistro'
            ],
            raw: true
        })
    } catch(err){
        console.log('error en findByEmail')
        console.log(err)
        return null
    }
};

export default repository;