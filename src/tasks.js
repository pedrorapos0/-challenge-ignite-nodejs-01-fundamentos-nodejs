import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

let tasks = [];

export function create(title, description) {
  const task = {
    id: randomUUID(),
    title: title,
    description: description,
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  tasks.push(task);

  database.persist("tasks", tasks);

  return task;
}

export function list() {
  tasks = database.select("tasks");
  return tasks;
}

export function update(id, title, description) {
  tasks = database.select("tasks");
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    let { created_at, updated_at, completed_at } = tasks[taskIndex];
    updated_at = new Date();
    tasks[taskIndex] = {
      id,
      title,
      description,
      created_at,
      updated_at,
      completed_at,
    };
    database.persist("tasks", tasks);
    return true;
  }
  return false;
}

export function remove(id) {
  tasks = database.select("tasks");
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
    database.persist("tasks", tasks);
    return true;
  }
  return false;
}

export function toComplete(id) {
  tasks = database.select("tasks");
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    let { id, title, description, created_at, updated_at, completed_at } =
      tasks[taskIndex];
    completed_at = new Date();
    tasks[taskIndex] = {
      id,
      title,
      description,
      created_at,
      updated_at,
      completed_at,
    };
    database.persist("tasks", tasks);
    return true;
  }
  return false;
}
