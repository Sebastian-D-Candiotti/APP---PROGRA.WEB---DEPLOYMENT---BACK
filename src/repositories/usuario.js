import model from '../models/usuario.js'
import RepositoryBase from './RepositoryBase.js'
import { Op } from 'sequelize';

const repository = new RepositoryBase(model);

repository.findByEmail = async function (correo) {
    try {
        
        const user = await model.findOne({
            
            where: {correo}, 

            where: {
                correo: correo
            },
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
        });

        console.log("DEBUG REPOSITORY: Usuario encontrado:", user ? user.id : "NULO"); 
        
        return user;
        
    } catch(err){
        console.log('error en findByEmail (Repository)')
        console.log(err)
        return null 
    }
};

export default repository;