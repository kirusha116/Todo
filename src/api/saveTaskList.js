
export function saveTaskList(taskList) {
  localStorage.setItem('todo', JSON.stringify(taskList));
};
