// test  task class:
import { Task } from "./Task";
import Priority from "./Priority";
import { Project } from "./Project";
import { format, compareAsc } from "date-fns";
import "./styles.css";
import { Modal } from "./Modal";
import { DOMOrganizer } from "./DOMOrganizer";
import { TaskManager } from "./TaskManager";

TaskManager.loadProjects();
DOMOrganizer.renderLeftSideBar();
