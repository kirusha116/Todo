import style from '../components/Task/Task.module.css'

export function makeStyleTask(index, lastIndex) {
    let className = style.task
    if (index === 0) { className += ' ' + style.task_start }
    if (index === lastIndex) { className += ' ' + style.task_end }
    return className
}