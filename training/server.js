import http from "node:http";
import { Database } from "./database.js";
import { json } from "./middlewares/json.js";
import { randomUUID } from "node:crypto";

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email, telefone } = req.body;

    const user = {
      id: randomUUID(),
      name,
      email,
      telefone,
    };

    database.insert("users", user);

    return res.writeHead(201).end();
  }

  if (method === "DELETE" && url.startsWith("/users")) {
    const id = url.split("/")[2];

    if (!id) {
      return res.writeHead(400).end("Id do usuário não fornecido");
    }

    try {
      database.remove(id, "users");
      return res.writeHead(200).end("Deu bom");
    } catch (error) {
      return res.setHeader(500).end(error);
    }
  }

  return res.writeHead(404).end("Not Found");
});

server.listen(3338);
