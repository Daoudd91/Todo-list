import { isToday } from "date-fns";
import { Task } from "./Task";
import { Project } from "./Project";

export class TaskManager {
  constructor() {
    this.projects = [];
  }

  loadProjects(filename) {
    // load projects saved in local storage
    let projs = localStorage.getItem("projects");
    if (projs == null) {
      return false;
    } else {
      this.projects = JSON.parse(projs);
      return true;
    }
  }

  saveProjects() {
    // save projects in local storage
    if (this.projects.length == 0) {
      return false;
    } else {
      localStorage.setItem("projects", JSON.stringify(this.projects));
      return true;
    }
  }

  getTodayTasks() {
    let projs = [];
    this.projects.forEach((x) => {
      let tasks = x.getTodayTasks();
      if (tasks.length > 0) {
        let pro = new Project(x.name);
        pro.tasks = tasks;
        projs.push(pro);
      }
    });
    return projs;
  }

  getCompletedTasks() {
    let projs = [];
    this.projects.forEach((x) => {
      let tasks = x.getCompletedTasks();
      if (tasks.length > 0) {
        let pro = new Project(x.name);
        pro.tasks = tasks;
        projs.push(pro);
      }
    });
    return projs;
  }

  getInCompletedTasks() {
    let projs = [];
    this.projects.forEach((x) => {
      let tasks = x.getInCompletedTasks();
      if (tasks.length > 0) {
        let pro = new Project(x.name);
        pro.tasks = tasks;
        projs.push(pro);
      }
    });
    return projs;
  }
}
