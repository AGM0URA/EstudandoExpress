import conn from "../config/conn.js";

const tableLivros = /*sql*/ `
CREATE TABLE IF NOT EXISTS livros (
    id varchar(255) PRIMARY KEY, 
    titulo varchar(255) NOT NULL,
    autor varchar(255) NOT NULL,
    ano_publicacao year(4) NOT NULL, 
    genero varchar(255) NOT NULL,
    preco decimal(10,2) NOT NULL,
    disponibilidade boolean,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`;


conn.query(tableLivros, (err, result, field) => {
  if (err) {
    console.error("erro ao cruar a tabela" + err.stack);
    return;
  }
 // console.log(result);
  //console.log(field);
  console.log("tabela livros criada com sucesso");
});
