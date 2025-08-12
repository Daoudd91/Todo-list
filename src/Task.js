import Priority from "./Priority";
export class Task {
  #id;
  #title;
  #description;
  #priority;
  #dueDate;
  #isDone;

  constructor(title, description, priority, dueDate, isDone) {
    this.#id = crypto.randomUUID();
    this.#title = title;
    this.#description = description;
    this.#priority = priority;
    this.#dueDate = dueDate;
    this.#isDone = isDone;
  }

  get id() {
    return this.#id;
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

  get isDone() {
    return this.#isDone;
  }

  set isDone(isDone) {
    this.#isDone = isDone;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      priority: this.#priority,
      dueDate: this.#dueDate,
      isDone: this.#isDone,
    };
  }
}
