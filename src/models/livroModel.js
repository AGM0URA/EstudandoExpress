import conn from "../config/conn.js";

const tableFuncionarios = /*sql*/ `
CREATE TABLE IF NOT EXISTS funcionarios (
    id varchar(255) PRIMARY KEY, 
    nome varchar(255) NOT NULL,
    cargo varchar(255) NOT NULL,
    ano_contratacao DATE NOT NULL, 
    salario decimal(10,2) NOT NULL,
    email  varchar(255) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`;


conn.query(tableFuncionarios, (err, result, field) => {
  if (err) {
    console.error("erro ao cruar a tabela" + err.stack);
    return;
  }
 // console.log(result);
  //console.log(field);
  console.log("tabela [Funcionarios] criada com sucesso");
});
