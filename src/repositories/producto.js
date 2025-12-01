import model from '../models/producto.js'
import Categorias from '../models/categorias.js' // Importamos el modelo con el que cruzamos
import RepositoryBase from './RepositoryBase.js'

// Creamos una clase extendida para personalizar las consultas de Producto
class ProductoRepository extends RepositoryBase {
    constructor() {
        super(model);
    }

    // Sobreescribimos findAll para agregar el JOIN (include)
    async findAll() {
        try {
            return await this.model.findAll({
                include: [{
                    model: Categorias,
                    as: 'categoriaDetail', // Debe coincidir con el alias de asocations.js
                    attributes: ['nombre'] // Solo traemos lo que nos interesa
                }],
                order: [['id', 'ASC']]
            });
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    // Hacemos lo mismo para findOne
    async findOne(id) {
        try {
            return await this.model.findOne({
                where: { id: id },
                include: [{
                    model: Categorias,
                    as: 'categoriaDetail',
                    attributes: ['nombre']
                }]
            })
        } catch(error) {
            console.log(error)
            return null;
        }
    }
}

const repository = new ProductoRepository();

// Mantienes tu método extra si lo necesitas
repository.findByName = async function (productname) {
    try {
        return await model.findOne({
            where: { nombre: productname}
        })
    } catch(err){
        console.log('error en findByName')
        console.log(err)
        return null
    }
}
    
export default repository;

/*
  Producto repository: devuelve productos incluyendo su categoría (categoriaDetail).
  Comentarios de documentación eliminados para evitar código no válido.
*/
/*
```

### ¿Qué cambiará en tu Frontend?
Ahora, cuando hagas un `GET` a `/producto`, cada producto vendrá con la información de su categoría incrustada:

```json
{
    "id": 1,
    "nombre": "Dying Light",
    "precio": 29.99,
    "categoria_id": 1,
    "categoriaDetail": {  <--- ESTO ES LO NUEVO
        "nombre": "Videojuegos",
        "label": "Videojuegos"
    }
}
    producto.categoriaDetail?.nombre
    */