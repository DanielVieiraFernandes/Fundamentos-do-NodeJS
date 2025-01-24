import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";
import {randomUUID} from 'node:crypto';

// - HTTP
//  - Método HTTP
//  - URL

// GET, POST, PUT, PATCH, DELETE

// GET ==> Buscar uma recurso do back-end

// POST ==> Criar uma recurso no back-end

// PUT ==> Atualizar um recurso no back-end

// PATCH ==> Atualizar uma informação específica de um recurso no back-end

// DELETE ==> Deletar um recurso do back-end

// GET /users ==> Buscando usuários no back-end
// POST /users ==> Criar um usuário no back-end

//  Stateful (sempre tem algum tipo de informação sendo salva em memória, e depende disso, e quando encerra aplicação, pode voltar a se comportar de um jeito diferente) - Stateless (Não salva nada em memória, independente se parar a aplicação, volta a funcionar normalmente)

// Cabeçalhos (Requisição/resposta) ==> Metadados

// HTTP status code

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url, statusCode } = req;

  console.log(method, url);

  await json(req, res);

  if (method === "GET" && url === "/users") {

    const users = database.select('users');

    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    const user = {
      id: randomUUID(),
      name,
      email,
    };

    database.insert("users", user)

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end("Not Found");
});

server.listen(3335);
