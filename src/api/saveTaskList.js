export const TASK_LIST_KEY = "TaskListKey";

export const saveTaskList = () => {
  localStorage.setItem(TASK_LIST_KEY, JSON.stringify(taskList));
};
