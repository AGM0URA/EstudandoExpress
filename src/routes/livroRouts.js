// routes/livroRoutes.js
import { Router } from 'express';
import { getLivros, cadastrarLivros, buscarLivros, editarLivros, removerLivros } from '../controller/livrosController.js';

const router = Router();

router.get('/', getLivros);
router.post('/criar', cadastrarLivros);
router.get('/:id', buscarLivros); // Alterado para usar GET para buscar por ID
router.put('/editar/:id', editarLivros);
router.delete('/remover/:id', removerLivros); // Utilizando DELETE para remover por ID

export default router;
