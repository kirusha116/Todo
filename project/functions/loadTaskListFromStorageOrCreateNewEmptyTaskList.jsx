export default function loadTaskListFromStorageOrCreateNewEmptyTaskList() {
    if ('todo' in localStorage) { return JSON.parse(localStorage.todo) }
    else { return [] }
}