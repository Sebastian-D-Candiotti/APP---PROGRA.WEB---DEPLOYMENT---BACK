import express from 'express'
import usuarioController from '../controllers/usuario.js'
import authMiddleware from '../middleware/auth.js';

const router = express.Router()

router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login)
router.post('/find-by-email', usuarioController.findByEmail);
router.post('/reset-password', usuarioController.resetPassword);

router.get('/', authMiddleware, usuarioController.findAll);
router.get('/:id', authMiddleware, usuarioController.findOne);
router.put('/', authMiddleware, usuarioController.update);
router.delete('/:id', authMiddleware, usuarioController.remove);
export default router;