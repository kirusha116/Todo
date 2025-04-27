export default function makeStyleTask(index, lastIndex) {
    let className = 'task'
    if (index === 0) { className += ' task_start' }
    if (index === lastIndex) { className += ' task_end' }
    return className
}