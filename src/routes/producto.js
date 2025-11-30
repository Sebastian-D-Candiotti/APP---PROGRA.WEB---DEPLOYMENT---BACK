import express from 'express';
import controller from '../controllers/producto.js'
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', controller.findAll);              // Público: ver productos
router.get('/:id', controller.findOne);           // Público: ver detalles
router.post('/', authMiddleware, controller.create);      // Admin: crear
router.put('/', authMiddleware, controller.update);       // Admin: editar
router.delete('/:id', authMiddleware, controller.remove); // Admin: borrar

export default router;