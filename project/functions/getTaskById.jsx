export default function getTaskById(taskList, id) {
    return taskList.find(task => task.id === id )
}