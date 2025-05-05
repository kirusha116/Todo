/** Либо берем из LocalStorage либо создаем */
export function initTaskList() {
  if ('todo' in localStorage) {
    return JSON.parse(localStorage.getItem('todo'));
  } else {
    return [];
  }
}
