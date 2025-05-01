import formatDateForInput from "./formatDateForInput"
import getRandomId from "./getRandomId"

export default function createNewTaskObj(name = '', description = '', deadline = formatDateForInput(new Date())) {
    
    return {
        id: getRandomId(),
        name,
        description,
        completed: false,
        deadline,
    }
}