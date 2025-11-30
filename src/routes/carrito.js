import express from 'express';
import controller from '../controllers/carrito.js'
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/:userId', authMiddleware, controller.getCart);      // Ver mi carrito
router.post('/add', authMiddleware, controller.addItem);         // Agregar producto
router.post('/remove', authMiddleware, controller.removeItem);   // Quitar un producto específico
router.delete('/:userId/clear', authMiddleware, controller.clearCart); // Vaciar todo

export default router;