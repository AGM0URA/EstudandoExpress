import "dotenv/config";
import express from "express";

//conexão
import conn from "./config/conn.js";

//importação modulos para criar tabelas
import "./models/livroModel.js";
import "./models/funcionarioModel.js"

//importação das rotas 
import livrosRoutes from "./routes/livroRouts.js"


const PORT = process.env.PORT;

const app = express();

app.get("/", (request, response) => {
  response.send("ola mundo");
});

app.listen(PORT, () => {
  console.log("Sevidor on PORT 😎 " + PORT);
});
