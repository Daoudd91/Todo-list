import { isToday } from "date-fns";
import { Task } from "./Task";
import { Project } from "./Project";

export class TaskManager {
  static #projects = [];

  static getProjects() {
    return TaskManager.#projects;
  }

  static loadProjects() {
    // load projects saved in local storage
    let projs = localStorage.getItem("projects");
    if (projs == null) {
      return false;
    } else {
      TaskManager.#projects = JSON.parse(projs);
      return true;
    }
  }

  static saveProjects() {
    // save projects in local storage
    if (TaskManager.#projects.length == 0) {
      return false;
    } else {
      localStorage.setItem("projects", JSON.stringify(TaskManager.#projects));
      return true;
    }
  }

  static getTodayTasks() {
    let projs = [];
    TaskManager.#projects.forEach((x) => {
      let tasks = x.getTodayTasks();
      if (tasks.length > 0) {
        let pro = new Project(x.name);
        pro.tasks = tasks;
        projs.push(pro);
      }
    });
    return projs;
  }

  static getUpcomingTasks() {
    let projs = [];
    TaskManager.#projects.forEach((x) => {
      let tasks = x.getUpcomingTasks();
      if (tasks.length > 0) {
        let pro = new Project(x.name);
        pro.tasks = tasks;
        projs.push(pro);
      }
    });
    return projs;
  }

  static getCompletedTasks() {
    let projs = [];
    TaskManager.#projects.forEach((x) => {
      let tasks = x.getCompletedTasks();
      if (tasks.length > 0) {
        let pro = new Project(x.name);
        pro.tasks = tasks;
        projs.push(pro);
      }
    });
    return projs;
  }

  static getInCompletedTasks() {
    let projs = [];
    TaskManager.#projects.forEach((x) => {
      let tasks = x.getInCompletedTasks();
      if (tasks.length > 0) {
        let pro = new Project(x.name);
        pro.tasks = tasks;
        projs.push(pro);
      }
    });
    return projs;
  }

  static getProjectByName(name) {
    return TaskManager.#projects.find((x) => x.name === name);
  }

  static addProject(name) {
    let pro = TaskManager.getProjectByName(name);
    if (pro == undefined) {
      pro = new Project(name);
      TaskManager.#projects.push(pro);
      return true;
    } else {
      return false;
    }
  }

  static removeProject(name) {
    let pro = TaskManager.getProjectByName(name);
    if (pro == undefined) {
      return false;
    } else {
      TaskManager.#projects.splice(TaskManager.#projects.indexOf(pro), 1);
      return true;
    }
  }

  static editProject(name, newName) {
    let pro = TaskManager.getProjectByName(name);
    let proWithNewName = TaskManager.getProjectByName(newName);
    if (pro == undefined) {
      return false;
    } else {
      if (proWithNewName != undefined) {
        return false;
      } else {
        pro.editName(newName);
        return true;
      }
    }
  }
}
