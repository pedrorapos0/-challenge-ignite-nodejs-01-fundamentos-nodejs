import fs from "node:fs/promises";
import { URL } from "node:url";

const databasePath = new URL("../database.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8").then(
      (data) => (this.#database = JSON.parse(data))
    );
  }

  persist(table, data) {
    this.#database[table] = data;
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    fs.readFile(databasePath, "utf8").then(
      (data) => (this.#database = JSON.parse(data))
    );
    return this.#database[table] ?? [];
  }
}
