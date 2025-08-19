import { isThisWeek, isToday } from "date-fns";
import { Task } from "./Task";
export class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.tasks.sort((a, b) => a.dueDate - b.dueDate);
    return true;
  }

  removeTask(id) {
    let task = this.tasks.find((x) => x.id === id);
    if (task == undefined) {
      return false;
    } else {
      let i = this.tasks.indexOf(task);
      this.tasks.splice(i, 1);
      return true;
    }
  }

  updateTask(id, newTitle, newDescription, newPriority, newDueDate, newIsDone) {
    let task = this.tasks.find((x) => x.id === id);
    if (task == undefined) {
      return false;
    } else {
      task.title = newTitle ? newTitle : task.title;
      task.description = newDescription ? newDescription : task.description;
      task.dueDate = newDueDate ? newDueDate : task.dueDate;
      task.isDone = newIsDone ? newIsDone : task.isDone;
      return true;
    }
  }

  editName(newName) {
    this.name = newName ? newName : this.name;
  }

  getTodayTasks() {
    return this.tasks.filter((x) => isToday(x.dueDate));
  }

  getUpcomingTasks() {
    return this.tasks.filter((x) => isThisWeek(x.dueDate));
  }

  getCompletedTasks() {
    return this.tasks.filter((x) => x.isDone);
  }

  getInCompletedTasks() {
    return this.tasks.filter((x) => !x.isDone);
  }

  getTaskById(id) {
    return this.tasks.find((x) => x.id === id);
  }
}
