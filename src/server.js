import 'dotenv/config';
import express from 'express';

// Conexão com o banco de dados MySQL
import conn from './config/conn.js';

// Importação dos modelos para criar tabelas
import './models/livroModel.js';
import './models/funcionarioModel.js';

// Importação das rotas
import livrosRoutes from './routes/livroRouts.js';
import funcionariosRoutes from './routes/funcionariosRouts.js';

const PORT = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas para livros
app.use('/livros', livrosRoutes);

// Rotas para funcionários
app.use('/funcionarios', funcionariosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
