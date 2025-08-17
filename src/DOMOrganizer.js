import today from "./assets/planning.png";
import upcoming from "./assets/upcoming.png";
import { Modal } from "./Modal";
import { TaskManager } from "./TaskManager";
import newIcon from "./assets/add-post.png";
import editIcon from "./assets/editing.png";
import deleteIcon from "./assets/delete.png";
import projectIcon from "./assets/project.png";

export class DOMOrganizer {
  static renderTask(parent, task) {}
  static renderProjectItem(project) {
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
    parent.appendChild(deletebtn);

    parent.addEventListener("click", () => {
      document.querySelector(".active")?.classList.toggle("active");
      parent.classList.toggle("active");
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
    });
    sidebar.appendChild(upcomingRow);

    let hr = document.createElement("hr");
    sidebar.appendChild(hr);

    let projTitle = document.createElement("div");
    projTitle.classList = "row title";

    let title = document.createElement("p");
    title.innerHTML = "🞃 Projects";
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
}
