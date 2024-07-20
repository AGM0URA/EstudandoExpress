// controller/funcionariosController.js
import conn from '../config/conn.js';
import { v4 as uuidv4 } from 'uuid';

export const getFuncionarios = (request, response) => {
  const sql = `SELECT * FROM funcionarios`;

  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ msg: 'Erro ao buscar funcionários' });
      console.error('Erro ao buscar funcionários:', err.stack);
      return;
    }
    response.status(200).json(data);
  });
};

export const cadastrarFuncionario = (request, response) => {
  const { nome, cargo, ano_contratacao, salario, email } = request.body;

  // Validação
  if (!nome || !cargo || !ano_contratacao || !salario || !email) {
    response.status(400).json({ message: 'Todos os campos são obrigatórios' });
    return;
  }

  // Verificar se o funcionário já existe
  const checkSQL = `SELECT * FROM funcionarios
                    WHERE nome = '${nome}' AND email = '${email}'`;

  conn.query(checkSQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: 'Erro ao buscar os funcionários' });
      console.error('Erro ao buscar os funcionários:', err.stack);
      return;
    }

    if (data.length > 0) {
      response.status(409).json({ message: 'Funcionário já existe' });
      return;
    }

    const id = uuidv4();

    const insertSQL = `INSERT INTO funcionarios
                      (id, nome, cargo, ano_contratacao, salario, email)
                      VALUES
                      ('${id}', '${nome}', '${cargo}', '${ano_contratacao}', '${salario}', '${email}')`;

    conn.query(insertSQL, (err) => {
      if (err) {
        response.status(500).json({ message: 'Erro ao cadastrar funcionário' });
        console.error('Erro ao cadastrar funcionário:', err.stack);
        return;
      }
      response.status(201).json({ message: 'Funcionário cadastrado com sucesso' });
    });
  });
};

export const buscarFuncionario = (request, response) => {
  // Implementar lógica para buscar um funcionário por ID
};

export const editarFuncionario = (request, response) => {
  // Implementar lógica para editar um funcionário por ID
};

export const removerFuncionario = (request, response) => {
  // Implementar lógica para remover um funcionário por ID
};
