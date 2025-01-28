import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

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


// três formas do front enviar parâmetros pro backend

// Query Parameters: URL Stateful ==> Filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário por exemplo.

// http://localhost:3333/users?userId=1&name=Diego - Query

// GET http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1


// POST http://localhost:3333/users

// Edição e remoção do usuário



const server = http.createServer(async (req, res) => {
  const { method, url, statusCode } = req;

  console.log(method, url);

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {

    const routeParams = req.url.match(route.path);

    console.log(routeParams);

    const {query, ...params} = routeParams.groups

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req,res);
  }

  return res.writeHead(404).end("Not Found");
});

server.listen(3333);
