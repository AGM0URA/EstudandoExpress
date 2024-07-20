// routes/funcionarioRoutes.js
import { Router } from 'express';
import { getFuncionarios, cadastrarFuncionario, buscarFuncionario, editarFuncionario, removerFuncionario } from '../controller/funcionariosContoller.js';

const router = Router();

router.get('/', getFuncionarios);
router.post('/criar', cadastrarFuncionario);
router.get('/:id', buscarFuncionario);
router.post('/editar/:id', editarFuncionario);
router.post('/remover/:id', removerFuncionario);

export default router;
