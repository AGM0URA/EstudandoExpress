// controller/livrosController.js
import conn from '../config/conn.js';
import { v4 as uuidv4 } from 'uuid';

export const getLivros = (request, response) => {
  const sql = `SELECT * FROM livros`;

  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ msg: 'Erro ao buscar livros' });
      console.error('Erro ao buscar livros:', err.stack);
      return;
    }
    response.status(200).json(data);
  });
};

export const cadastrarLivros = (request, response) => {
  const { titulo, autor, ano_publicacao, genero, preco } = request.body;

  // Validação
  if (!titulo || !autor || !ano_publicacao || !genero || !preco) {
    response.status(400).json({ message: 'Todos os campos são obrigatórios' });
    return;
  }

  // Verificar se o livro já existe
  const checkSQL = `SELECT * FROM livros
                    WHERE titulo = ? AND autor = ? AND ano_publicacao = ?`;

  conn.query(checkSQL, [titulo, autor, ano_publicacao], (err, data) => {
    if (err) {
      response.status(500).json({ message: 'Erro ao buscar os livros' });
      console.error('Erro ao buscar os livros:', err.stack);
      return;
    }

    if (data.length > 0) {
      response.status(409).json({ message: 'Livro já existe' });
      return;
    }

    // Inserir o livro
    const id = uuidv4();
    const disponibilidade = 1; // 1 (o livro está disponível)

    const insertSQL = `INSERT INTO livros
                      (id, titulo, autor, ano_publicacao, genero, preco, disponibilidade)
                      VALUES
                      (?, ?, ?, ?, ?, ?, ?)`;

    conn.query(insertSQL, [id, titulo, autor, ano_publicacao, genero, preco, disponibilidade], (err) => {
      if (err) {
        response.status(500).json({ message: 'Erro ao cadastrar livro' });
        console.error('Erro ao cadastrar livro:', err.stack);
        return;
      }
      response.status(201).json({ message: 'Livro cadastrado com sucesso' });
    });
  });
};


export const buscarLivros = (request, response) => {
  const livroId = request.params.id;

  const sql = `SELECT * FROM livros WHERE id = ?`;

  conn.query(sql, [livroId], (err, data) => {
    if (err) {
      response.status(500).json({ message: 'Erro ao buscar livro' });
      console.error('Erro ao buscar livro:', err.stack);
      return;
    }
    if (data.length === 0) {
      response.status(404).json({ message: 'Livro não encontrado' });
      return;
    }
    response.status(200).json(data[0]);
  });
};

export const editarLivros = (request, response) => {
  const livroId = request.params.id;
  const { titulo, autor, ano_publicacao, genero, preco } = request.body;

  const updateSQL = `UPDATE livros
                    SET titulo = ?, autor = ?, ano_publicacao = ?, genero = ?, preco = ?
                    WHERE id = ?`;

  conn.query(updateSQL, [titulo, autor, ano_publicacao, genero, preco, livroId], (err, result) => {
    if (err) {
      response.status(500).json({ message: 'Erro ao editar livro' });
      console.error('Erro ao editar livro:', err.stack);
      return;
    }
    response.status(200).json({ message: 'Livro editado com sucesso' });
  });
};

export const removerLivros = (request, response) => {
  const livroId = request.params.id;

  const deleteSQL = `DELETE FROM livros WHERE id = ?`;

  conn.query(deleteSQL, [livroId], (err, result) => {
    if (err) {
      response.status(500).json({ message: 'Erro ao remover livro' });
      console.error('Erro ao remover livro:', err.stack);
      return;
    }
    if (result.affectedRows === 0) {
      response.status(404).json({ message: 'Livro não encontrado' });
      return;
    }
    response.status(200).json({ message: 'Livro removido com sucesso' });
  });
};
