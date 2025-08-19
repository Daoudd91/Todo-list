import { Task } from "./Task";
import { Project } from "./Project";
import { TaskManager } from "./TaskManager";
import { DOMOrganizer } from "./DOMOrganizer";
import { format } from "date-fns";

export class Modal {
  static showTaskModal(project, task) {
    let modal = document.createElement("div");
    modal.classList = "modal";
    modal.id = "myModal";

    let modalContent = document.createElement("div");
    modalContent.classList = "modal-content";
    modal.appendChild(modalContent);

    let span = document.createElement("span");
    span.classList = "close";
    span.innerHTML = "&times;";
    modalContent.appendChild(span);

    let title = document.createElement("h1");
    title.classList = "modal-title";
    title.innerHTML = task == undefined ? "New Task" : "Edit Task";
    modalContent.appendChild(title);

    let form = document.createElement("form");
    form.id = "taskForm";
    form.onsubmit = function () {
      return false;
    };
    modalContent.appendChild(form);

    let fieldset = document.createElement("fieldset");
    form.appendChild(fieldset);

    let input = document.createElement("input");
    input.id = "title";
    input.name = "title";
    input.required = true;
    input.placeholder = "Title";
    input.value = task != undefined ? task.title : "";
    input.classList = "singleRow";
    fieldset.appendChild(input);

    input = document.createElement("input");
    input.id = "description";
    input.name = "description";
    input.required = true;
    input.placeholder = "Description";
    input.value = task != undefined ? task.description : "";
    input.classList = "singleRow";
    fieldset.appendChild(input);

    let subFieldset = document.createElement("fieldset");
    let legend = document.createElement("legend");
    legend.innerHTML = "Priority";
    subFieldset.appendChild(legend);
    subFieldset.classList = "singleRow";

    let div = document.createElement("div");
    div.classList = "glass-radio-group";
    subFieldset.appendChild(div);

    input = document.createElement("input");
    input.type = "radio";
    input.id = "high";
    input.name = "priority";
    input.value = "high";
    if (task != undefined) {
      if (task.priority === input.id) {
        input.checked = true;
      }
    }
    div.appendChild(input);

    let label = document.createElement("label");
    label.setAttribute("for", "high");
    label.innerHTML = "High";
    div.appendChild(label);

    input = document.createElement("input");
    input.type = "radio";
    input.id = "medium";
    input.name = "priority";
    input.value = "medium";
    if (task != undefined) {
      if (task.priority === input.id) {
        input.checked = true;
      }
    }
    div.appendChild(input);

    label = document.createElement("label");
    label.setAttribute("for", "medium");
    label.innerHTML = "Medium";
    div.appendChild(label);

    input = document.createElement("input");
    input.type = "radio";
    input.id = "low";
    input.name = "priority";
    input.value = "low";
    if (task != undefined) {
      if (task.priority === input.id) {
        input.checked = true;
      }
    }
    div.appendChild(input);

    label = document.createElement("label");
    label.setAttribute("for", "low");
    label.innerHTML = "Low";
    div.appendChild(label);

    let subdiv = document.createElement("div");
    subdiv.classList = "glass-glider";
    div.appendChild(subdiv);

    fieldset.appendChild(subFieldset);

    label = document.createElement("label");
    label.setAttribute("for", "dueDate");
    label.innerHTML = "Due Date";
    fieldset.appendChild(label);

    input = document.createElement("input");
    input.type = "date";
    input.value = task != undefined ? format(task.dueDate, "yyyy-MM-dd") : "";
    input.name = "dueDate";
    input.id = "dueDate";
    fieldset.appendChild(input);

    let okButt = document.createElement("button");
    okButt.classList = "modal-button";
    okButt.innerHTML = "OK";
    okButt.type = "button";
    fieldset.appendChild(okButt);

    let cancelButt = document.createElement("button");
    cancelButt.classList = "modal-button cancel";
    cancelButt.innerHTML = "Cancel";
    cancelButt.type = "button";
    fieldset.appendChild(cancelButt);

    modal.style.animation = "appear 1s";
    document.body.appendChild(modal);

    // add event listeners
    okButt.addEventListener("click", (event) => {
      Modal.#submitForm(
        task == undefined ? "newTask" : "editTask",
        form,
        project,
        task
      );
    });

    cancelButt.addEventListener("click", () => Modal.closeModal());
    span.addEventListener("click", () => Modal.closeModal());
  }

  static showProjectModal(project) {
    let modal = document.createElement("div");
    modal.classList = "modal";
    modal.id = "myModal";

    let modalContent = document.createElement("div");
    modalContent.classList = "modal-content";
    modalContent.style.height = "250px";
    modal.appendChild(modalContent);

    let span = document.createElement("span");
    span.classList = "close";
    span.innerHTML = "&times;";
    span.addEventListener("click", () => Modal.closeModal());
    modalContent.appendChild(span);

    let title = document.createElement("h1");
    title.classList = "modal-title";
    title.innerHTML = project == undefined ? "New Project" : "Edit Project";
    modalContent.appendChild(title);

    let form = document.createElement("form");
    form.id = "taskForm";
    form.onsubmit = function () {
      return false;
    };
    modalContent.appendChild(form);

    let fieldset = document.createElement("fieldset");
    form.appendChild(fieldset);
    let input = document.createElement("input");
    input.id = "name";
    input.name = "name";
    input.required = true;
    input.placeholder = "Project Name";
    input.value = project != undefined ? project.name : "";
    input.classList = "singleRow";
    fieldset.appendChild(input);

    let okButt = document.createElement("button");
    okButt.classList = "modal-button";
    okButt.innerHTML = "OK";
    okButt.type = "button";
    okButt.addEventListener("click", () =>
      Modal.#submitForm(
        project == undefined ? "newProject" : "editProject",
        form,
        project
      )
    );
    fieldset.appendChild(okButt);

    let cancelButt = document.createElement("button");
    cancelButt.classList = "modal-button cancel";
    cancelButt.innerHTML = "Cancel";
    cancelButt.type = "button";
    cancelButt.addEventListener("click", () => {
      Modal.closeModal();
    });
    fieldset.appendChild(cancelButt);

    modal.style.animation = "appear 1s";
    document.body.appendChild(modal);
  }

  static showAlertMessage(isSuccess, message) {
    let alert = document.createElement("div");

    alert.classList = isSuccess ? "alert success" : "alert fail";

    alert.innerHTML = isSuccess ? "🗹 " + message : "🗷 " + message;
    document.body.appendChild(alert);
    setTimeout(() => {
      alert.style.animation = "vanish 1s";
      setTimeout(() => {
        alert.remove();
      }, 800);
    }, 2000);
  }

  static closeModal() {
    let modal = document.querySelector(".modal");
    modal.style.animation = "vanish 1s";
    setTimeout(() => modal.remove(), 900);
  }

  static #submitForm(formType, form, project, task) {
    let data = new FormData(form);
    switch (formType) {
      case "newTask": {
        let newTask = new Task(
          data.get("title"),
          data.get("description"),
          data.get("priority"),
          data.get("dueDate"),
          false
        );
        if (project.addTask(newTask)) {
          Modal.closeModal();
          Modal.showAlertMessage(true, "Task was added successfully");
          DOMOrganizer.renderContent();
          TaskManager.saveProjects();
        } else {
          Modal.closeModal();
          showFailureMessage(false, "Failed to add task");
        }
        break;
      }

      case "editTask": {
        let newTitle = data.get("title");
        let newDescription = data.get("description");
        let newPriority = data.get("priority");
        let newDueDate = data.get("dueDate");
        if (
          project.updateTask(
            task.id,
            newTitle,
            newDescription,
            newPriority,
            newDueDate
          )
        ) {
          Modal.closeModal();
          Modal.showAlertMessage(true, "Task was updated successfully");
          DOMOrganizer.renderContent();
          TaskManager.saveProjects();
        } else {
          Modal.closeModal();
          showAlertMessage(false, "Failed to update task");
        }
        break;
      }

      case "newProject": {
        let projName = data.get("name");
        if (TaskManager.addProject(projName)) {
          Modal.closeModal();
          Modal.showAlertMessage(
            true,
            "Project " + projName + " was added successfully"
          );
          DOMOrganizer.refreshProjectsList();
          TaskManager.saveProjects();
        } else {
          Modal.closeModal();
          Modal.showAlertMessage(false, "failed to add project " + projName);
        }
        break;
      }

      case "editProject": {
        let projName = data.get("name");
        let name = project.name;
        if (TaskManager.editProject(project.name, projName)) {
          Modal.closeModal();
          Modal.showAlertMessage(true, "project name was updated successfully");
          DOMOrganizer.refreshProjectsList();
          DOMOrganizer.updateActiveProject(projName);
          TaskManager.saveProjects();
        } else {
          Modal.closeModal();
          Modal.showAlertMessage(false, "failed to update project name");
        }
        break;
      }
    }
  }

  static showConfirmModal(project, task) {
    let modal = document.createElement("div");
    modal.classList = "modal";
    modal.id = "myModal";

    let modalContent = document.createElement("div");
    modalContent.classList = "modal-content";
    modalContent.style.height = "160px";
    modal.appendChild(modalContent);

    let span = document.createElement("span");
    span.classList = "close";
    span.innerHTML = "&times;";
    span.addEventListener("click", () => Modal.closeModal());
    modalContent.appendChild(span);
    let title = document.createElement("h1");
    title.classList = "modal-title";
    title.innerHTML =
      task != undefined
        ? `Are you sure you want to delete task ${task.title} ?`
        : `Are you sure you want to delete project ${project.name} ?`;

    modalContent.appendChild(title);

    let yesBtn = document.createElement("button");
    yesBtn.classList = "modal-button";
    yesBtn.innerHTML = "OK";
    modalContent.appendChild(yesBtn);

    let noBtn = document.createElement("button");
    noBtn.classList = "modal-button cancel";
    noBtn.innerHTML = "Cancel";
    modalContent.appendChild(noBtn);

    yesBtn.addEventListener("click", () => {
      Modal.closeModal();
      if (task == undefined) {
        if (TaskManager.removeProject(project.name)) {
          let name = project.name;
          Modal.showAlertMessage(true, "Project deleted successfully");
          DOMOrganizer.refreshProjectsList();
          DOMOrganizer.clearActiveProject(name);
          TaskManager.saveProjects();
        } else {
          Modal.showAlertMessage(false, "Failed to delete project");
        }
      } else {
        if (project.removeTask(task.id)) {
          Modal.showAlertMessage(true, "Task deleted successfully");
          DOMOrganizer.renderContent();
          TaskManager.saveProjects();
        } else {
          Modal.showAlertMessage(false, "Failed to delete task");
        }
      }
    });
    noBtn.addEventListener("click", () => {
      Modal.closeModal();
    });
    modal.style.animation = "appear 1s";
    document.body.appendChild(modal);
  }
}
