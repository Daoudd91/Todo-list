// test  task class:
import { Task } from "./Task";
import Priority from "./Priority";
import { Project } from "./Project";
import { format, compareAsc } from "date-fns";
import "./styles.css";
import { Modal } from "./Modal";
import { DOMOrganizer } from "./DOMOrganizer";
import { TaskManager } from "./TaskManager";

TaskManager.addProject("Daoud");
TaskManager.getProjectByName("Daoud").addTask(
  new Task(
    "daoud task 1",
    "daoud description 1",
    Priority.Low,
    new Date(),
    false
  )
);
TaskManager.addProject("rere");
TaskManager.addProject("fofo");

DOMOrganizer.renderLeftSideBar();
