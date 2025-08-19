import today from "./assets/planning.png";
import upcoming from "./assets/upcoming.png";
import { Modal } from "./Modal";
import { TaskManager } from "./TaskManager";
import newIcon from "./assets/add-post.png";
import editIcon from "./assets/editing.png";
import deleteIcon from "./assets/delete.png";
import projectIcon from "./assets/project.png";
import { format } from "date-fns";

export class DOMOrganizer {
  static #activeprojects = [];

  static renderTask(parent, task) {
    let taskDiv = document.createElement("div");
    taskDiv.classList = "task";

    let textsDiv = document.createElement("div");

    let title = document.createElement("h3");
    title.innerHTML = task.title;
    textsDiv.appendChild(title);

    let description = document.createElement("p");
    description.innerHTML = task.description;
    textsDiv.appendChild(description);
    taskDiv.appendChild(textsDiv);

    let dueDate = document.createElement("p");
    dueDate.innerHTML = format(task.dueDate, "dd-MM-yyyy");
    taskDiv.appendChild(dueDate);

    let priority = document.createElement("p");
    priority.innerHTML = task.priority;
    taskDiv.appendChild(priority);

    let isDone = document.createElement("div");
    isDone.innerHTML = task.isDone ? "completed" : "not completed";
    taskDiv.appendChild(isDone);

    parent.appendChild(taskDiv);
  }

  static renderEmptyTask(parent, project) {
    let emptyDiv = document.createElement("div");
    emptyDiv.classList = "empty-task";

    emptyDiv.innerHTML = " + Add Task";
    emptyDiv.addEventListener("click", () => {
      Modal.showTaskModal(project);
    });
    parent.appendChild(emptyDiv);
  }

  static renderProjectItem(project) {
    // in the left side bar
    let parent = document.createElement("div");
    parent.classList = "project-item activateable";
    let img = document.createElement("img");
    img.src = projectIcon;
    img.style.width = "25px";
    img.style.height = "25px";
    parent.appendChild(img);

    let name = document.createElement("p");
    name.innerHTML = project.name;
    parent.appendChild(name);

    let editbtn = document.createElement("img");
    editbtn.src = editIcon;
    editbtn.classList = "clickable-icon";
    editbtn.addEventListener("click", () => {
      Modal.showProjectModal(project);
    });
    parent.appendChild(editbtn);

    let deletebtn = document.createElement("img");
    deletebtn.src = deleteIcon;
    deletebtn.classList = "clickable-icon";
    deletebtn.addEventListener("click", () => Modal.showConfirmModal(project));
    parent.appendChild(deletebtn);

    parent.addEventListener("click", () => {
      document.querySelector(".active")?.classList.toggle("active");
      parent.classList.toggle("active");
      DOMOrganizer.#activeprojects = [project];
      DOMOrganizer.renderContent();
    });

    let container = document.querySelector(".project-list-container");
    container.appendChild(parent);
  }

  static renderLeftSideBar() {
    // first render the today section
    // then the upcoming section
    // then a line break
    // then the projects section title with a plus in the right to add new project
    let sidebar = document.querySelector("#sidebar");
    let todayRow = document.createElement("div");
    todayRow.classList = "row activateable";
    let image = document.createElement("img");
    image.src = today;
    image.classList = "today-upcoming-icon";
    todayRow.appendChild(image);
    let titl = document.createElement("p");
    titl.innerHTML = "Today";
    todayRow.appendChild(titl);
    todayRow.addEventListener("click", () => {
      document.querySelector(".active")?.classList.toggle("active");
      todayRow.classList.toggle("active");
      DOMOrganizer.#activeprojects = TaskManager.getTodayTasks();
      DOMOrganizer.renderContent();
    });
    sidebar.appendChild(todayRow);

    let upcomingRow = document.createElement("div");
    upcomingRow.classList = "row activateable";
    image = document.createElement("img");
    image.src = upcoming;
    image.classList = "today-upcoming-icon";
    upcomingRow.appendChild(image);
    titl = document.createElement("p");
    titl.innerHTML = "Upcoming";
    upcomingRow.appendChild(titl);
    upcomingRow.addEventListener("click", () => {
      document.querySelector(".active")?.classList.toggle("active");
      upcomingRow.classList.toggle("active");
      DOMOrganizer.#activeprojects = TaskManager.getUpcomingTasks();
      DOMOrganizer.renderContent();
    });
    sidebar.appendChild(upcomingRow);

    let hr = document.createElement("hr");
    sidebar.appendChild(hr);

    let projTitle = document.createElement("div");
    projTitle.classList = "row title";

    let title = document.createElement("p");
    let span = document.createElement("span");
    span.innerHTML = "🞃";
    span.classList = "rotateable-open";
    span.addEventListener("click", () => {
      span.classList.toggle("rotateable-open");
      span.classList.toggle("rotateable-closed");
      document
        .querySelector(".project-list-container")
        .classList.toggle("closed");
    });
    title.innerHTML = "Projects ";
    title.appendChild(span);
    title.style.fontWeight = 900;
    projTitle.appendChild(title);

    let newProjectIcon = document.createElement("img");
    newProjectIcon.src = newIcon;
    newProjectIcon.classList = "clickable-icon";
    newProjectIcon.addEventListener("click", () => Modal.showProjectModal());
    projTitle.appendChild(newProjectIcon);

    sidebar.appendChild(projTitle);

    let projListContainer = document.createElement("div");
    projListContainer.classList = "project-list-container";
    sidebar.appendChild(projListContainer);

    DOMOrganizer.refreshProjectsList();
  }

  static refreshProjectsList() {
    document.querySelector(".project-list-container").innerHTML = "";
    let projects = TaskManager.getProjects();
    projects.forEach((project) => {
      DOMOrganizer.renderProjectItem(project);
    });
  }

  static renderContent() {
    let container = document.querySelector("#content");
    container.innerHTML = "";
    if (DOMOrganizer.#activeprojects.length == 0) {
      // show block of nothing exists or add a project
    } else {
      DOMOrganizer.#activeprojects.forEach((project) => {
        let projTitle = document.createElement("button");
        projTitle.classList = "collapsible";
        projTitle.innerHTML = project.name;
        let con = document.createElement("div");
        con.classList = "expanded-content";
        if (project.tasks.length == 0) {
          // show add task row
        } else {
          project.tasks.forEach((task) => {
            DOMOrganizer.renderTask(con, task);
          });
        }
        DOMOrganizer.renderEmptyTask(con, project);

        projTitle.addEventListener("click", () => {
          projTitle.classList.toggle("active-project");
          con.classList.toggle("collapsed-content");
          con.classList.toggle("expanded-content");
        });
        container.appendChild(projTitle);
        container.appendChild(con);
      });
    }
  }
}
