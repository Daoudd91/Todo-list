import { Task } from "./Task";
import { Project } from "./Project";
import { TaskManager } from "./TaskManager";
import { data } from "browserslist";

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
    input.value = Date.now();
    input.name = "dueDate";
    input.id = "dueDate";
    fieldset.appendChild(input);

    let butt = document.createElement("button");
    butt.type = "submit";
    butt.classList = "modal-button";
    butt.innerHTML = "OK";
    fieldset.appendChild(butt);

    butt = document.createElement("button");
    butt.classList = "modal-button cancel";
    butt.innerHTML = "Cancel";
    fieldset.appendChild(butt);

    modal.style.animation = "appear 1s";
    document.body.appendChild(modal);

    // add event listeners
    form.addEventListener("submit", (event) => {
      Modal.#submitForm(
        task == undefined ? "newTask" : "editTask",
        form,
        project,
        task
      );
    });

    butt.addEventListener("click", () => Modal.closeModal());
    span.addEventListener("click", () => Modal.closeModal());
  }

  static showProjectModal(project) {
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
    title.innerHTML = project == undefined ? "New Project" : "Edit Project";
    modalContent.appendChild(title);

    let form = document.createElement("form");
    form.id = "taskForm";
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

    let butt = document.createElement("button");
    butt.type = "submit";
    butt.classList = "modal-button";
    butt.innerHTML = "OK";
    fieldset.appendChild(butt);

    butt = document.createElement("button");
    butt.classList = "modal-button cancel";
    butt.innerHTML = "Cancel";
    fieldset.appendChild(butt);

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
        if (project.addTask(task)) {
          Modal.closeTaskModal();
          Modal.showAlertMessage(true, "Task was added successfully");
        } else {
          Modal.closeTaskModal();
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
        } else {
          Modal.closeModal();
          showAlertMessage(false, "Failed to update task");
        }
        break;
      }
    }
  }
}
