export default function filterTasksBySelectedState(selectedState, taskList) {

    const filteredTaskList = {
        ALL: taskList,
        CURRENT: taskList.filter(task => task.completed === false),
        COMPLETED: taskList.filter(task => task.completed === true),
    }

    return filteredTaskList[selectedState]
}