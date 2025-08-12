import { Task } from "./Task";
import { fs } from "memfs";

export class TaskManager {
  constructor() {
    this.projects = [];
  }

  loadProjectsFromFile(filename) {
    // load projects saved in a file
    return true;
  }

  saveProjectsToFile() {
    // save projects in a file
    return true;
  }
}
