import http from "node:http";
import { json } from "node:stream/consumers";

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

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url, statusCode } = req;

  console.log(method, url);

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  // {"name": "Daniel", "Email": "daniel@email.com"} teria que esperar totalmente pra poder consumir.

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    users.push({
      id: Math.random(),
      name,
      email,
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end("Not Found");
});

server.listen(3333);
