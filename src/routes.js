import { buildRoutesUrl } from "./utils/build-routes-path.js";
import { create, list, remove, toComplete, update } from "./tasks.js";

const routes = [
  {
    method: "GET",
    url: buildRoutesUrl("/tasks"),
    handler: function (req, res) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      const users = list();
      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    url: buildRoutesUrl("/tasks"),
    handler: function (req, res) {
      try {
        const { title, description } = req.body;
        if (!title || !description) {
          res.statusCode = 400;
          return res.end();
        }
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        const user = create(title, description);
        return res.end(JSON.stringify(user));
      } catch {
        res.statusCode = 400;
        return res.end();
      }
    },
  },
  {
    method: "PUT",
    url: buildRoutesUrl("/tasks/:id"),
    handler: function (req, res) {
      try {
        const { title, description } = req.body;
        if (!title || !description) {
          res.statusCode = 400;
          return res.end();
        }
        res.statusCode = 204;
        const { id } = req.params;
        const idExist = update(id, title, description);
        if (!idExist) {
          res.statusCode = 404;
          return res.end();
        }
        return res.end();
      } catch {
        res.statusCode = 400;
        return res.end();
      }
    },
  },
  {
    method: "PATCH",
    url: buildRoutesUrl("/tasks/:id"),
    handler: function (req, res) {
      const { id } = req.params;
      res.statusCode = 204;
      const idExist = toComplete(id);
      if (!idExist) {
        res.statusCode = 404;
        return res.end();
      }
      return res.end();
    },
  },
  {
    method: "DELETE",
    url: buildRoutesUrl("/tasks/:id"),
    handler: function (req, res) {
      const { id } = req.params;
      res.statusCode = 204;
      const idExist = remove(id);
      if (!idExist) {
        res.statusCode = 404;
        return res.end();
      }
      return res.end();
    },
  },
];

export function getRoute(req, res) {
  const route = routes.find((route) => {
    return route.method === req.method && route.url.test(req.url);
  });

  if (route) {
    const routeParamenters = req.url.match(route.url);
    req.params = { ...routeParamenters.groups };
    return route.handler(req, res);
  } else {
    res.statusCode = 404;
    return res.end();
  }
}
