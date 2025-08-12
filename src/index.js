// test  task class:
import { Task } from "./Task";
import Priority from "./Priority";
import { Project } from "./Project";
import { format, compareAsc } from "date-fns";

let project = new Project("proj 1");

let task = new Task(
  "task1",
  "desc1",
  Priority.High,
  new Date(2025, 8, 12),
  false
);

project.addTask(task);

task = new Task("task2", "desc2", Priority.Low, new Date(2025, 9, 12), false);

project.addTask(task);
console.log(JSON.stringify(project));
task = new Task("task3", "desc3", Priority.High, new Date(2025, 8, 12), false);
project.addTask(task);
console.log(JSON.stringify(project));
project.updateTask(task.id, "updatedTask3");
console.log(JSON.stringify(project));
project.removeTask(project.tasks[0].id);

console.log(JSON.stringify(project));
