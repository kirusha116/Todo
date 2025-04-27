export default function changeTaskCompletedStatus(id, taskList) {
    
    const newTaskList = taskList.slice()
    newTaskList.forEach(task => {
        if (task.id === id) {
            task.completed = !task.completed
        }
    })
    return newTaskList
}