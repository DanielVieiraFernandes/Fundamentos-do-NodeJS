import fs from "node:fs/promises";
const databasePath = new URL("db.json", import.meta.url)

export class Database {
  #database = {};

  constructor(){
    fs.readFile(databasePath,"utf-8").then(data => {
        this.#database = JSON.parse(data);
    }).catch(err => {
        this.#persist();
    })
  }

  #persist(){
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
    return data;
  }

  remove(id,table){
    if (Array.isArray(this.#database[table])) {
        const originalLength = this.#database[table].length;
    
        this.#database[table] = this.#database[table].filter(user => user.id !== id);
    
        if (this.#database[table].length < originalLength) {
          this.#persist();
          return `Usuário com ID "${id}" foi removido com sucesso.`;
        } else {
          return `Usuário com ID "${id}" não encontrado.`;
        }
      } else {
        throw new Error(`Tabela "${table}" não existe ou não é um array.`);
      }
  }
}
