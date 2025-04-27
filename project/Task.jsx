import tick from './image/Tick.svg'
import trash from './image/Trash.svg'
import pencil from './image/Pencil.svg'
import formatDateForTextBlock from './functions/formatDateForTextBlock'
import { useState } from 'react'
import './styles/Task.css'

export default function Task({ id, name, description, deadline, completed, className, propsForTask }) {

    const { deleteTask, completeTask, openModalForEdit } = propsForTask

    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

    return (
        <div className={isDescriptionVisible ? className + ' task_with-description' : className} >

            <div className="task__wrapper">

                <div className="task__square" onClick={() => completeTask(id)}>
                    {completed && <img src={tick} style={{ height: "27px" }} alt=""></img>}
                </div>

                <div className="task__text" onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}>
                    <p className="task__text-subject">{name}</p>
                    <span className="task__text-deadline">{formatDateForTextBlock(deadline)}</span>
                </div>

                <div className="task__square" onClick={() => deleteTask(id)}>
                    <img src={trash} style={{ height: "24px" }} alt=""></img>
                </div>

                <div className="task__square" onClick={() => openModalForEdit(id)} >
                    <img src={pencil} style={{ height: "25px" }} alt=""></img>
                </div>

            </div>

            {isDescriptionVisible && <div className="task__description">{description}</div>}

        </div>
    )
}