export default function replaceEditedTask(taskList, name, description, deadline, id) {

    const newTaskList = taskList.slice()
    const index = taskList.findIndex(task => task.id === id)
    newTaskList[index].name = name
    newTaskList[index].description = description
    newTaskList[index].deadline = deadline

    return newTaskList
}