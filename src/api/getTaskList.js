import { TASK_LIST_KEY } from "./saveTaskList";

/** Либо берем из LocalStorage либо создаем */
export default function initTaskList() {
  if (TASK_LIST_KEY in localStorage) {
    return JSON.parse(localStorage.getItem(TASK_LIST_KEY));
  } else {
    return [];
  }
}
