// models/funcionarioModel.js
import conn from '../config/conn.js';

const tableFuncionarios = `
CREATE TABLE IF NOT EXISTS funcionarios (
    id varchar(255) PRIMARY KEY, 
    nome varchar(255) NOT NULL,
    cargo varchar(255) NOT NULL,
    ano_contratacao DATE NOT NULL, 
    salario decimal(10,2) NOT NULL,
    email varchar(255) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`;

conn.query(tableFuncionarios, (err) => {
  if (err) {
    console.error('Erro ao criar a tabela de funcionários:', err.stack);
    return;
  }
  console.log('Tabela de funcionários criada com sucesso');
});
