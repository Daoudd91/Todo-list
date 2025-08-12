import Priority from "./Priority";
export class Task {
  #title;
  #description;
  #priority;
  #dueDate;
  #isCompleted;

  constructor(title, description, priority, dueDate, isCompleted) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    this.#title = title;
  }

  get description() {
    return this.#description;
  }

  set description(description) {
    this.#description = description;
  }

  get priority() {
    return this.#priority;
  }

  set priority(priority) {
    this.#priority = priority;
  }

  get dueDate() {
    return this.#dueDate;
  }

  set dueDate(dueDate) {
    this.#dueDate = dueDate;
  }

  get isCompleted() {
    return this.#isCompleted;
  }

  set isCompleted(isCompleted) {
    this.#isCompleted = isCompleted;
  }
}
