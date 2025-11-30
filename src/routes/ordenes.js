import express from 'express';
import controller from '../controllers/ordenes.js'
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, controller.findAll);           // Ver todas (admin)
router.get('/:userId', authMiddleware, controller.findByUser); // Ver historial de un usuario
router.post('/', authMiddleware, controller.create);           // Crear nueva orden (Checkout)

export default router;