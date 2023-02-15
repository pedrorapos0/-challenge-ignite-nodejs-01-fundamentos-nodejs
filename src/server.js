import http from "node:http";
import { json } from "./middlewares/json.js";
import { getRoute } from "./routes.js";

const server = http.createServer(async (req, res) => {
  await json(req, res);
  getRoute(req, res);
});

server.listen(3333, () => {
  console.log("Server started on port 3333!");
});
