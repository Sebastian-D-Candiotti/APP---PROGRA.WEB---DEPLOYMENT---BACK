class RepositoryBase {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        try {
            return await this.model.findAll({
                order: [
                    ['id', 'ASC'] // Ordenar por ID de forma Ascendente (1, 2, 3...)
                ]
            });
        } catch(err) {
            console.log(error);
            return null;
        }
    }

    async create(entity) {
        try {
            return await this.model.create(entity);
        } catch (error) {
            console.debug(error);
            return null;
        }
    }

    async findOne(id) {
        try {
            return await this.model.findOne({
                where : { id: id}
            })
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    async update(id, entity) {
        try {
            const result = await this.model.update(entity, {
                where: { id: id },
                returning: true // Opción útil para Postgres
            });
            
            // Si se actualizó algo, devolvemos el objeto actualizado
            if (result && result[0] > 0) {
                 // result[1][0] contiene el objeto actualizado en Postgres
                return result[1][0];
            }
            return null;
        } catch (error) {
            console.error('Error en update:', error);
            return null;
        }
    }
    /*
    async update(entity) {
        try {
            return await this.model.update(entity, {
                where : { id: id}
            })
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    */
    async remove(id) {
        try {
            return await this.model.destroy({
                where : { id: id}
            })
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}

export default RepositoryBase;