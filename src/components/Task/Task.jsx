import tick from '../../images/Tick.svg'
import trash from '../../images/Trash.svg'
import pencil from '../../images/Pencil.svg'
import formatDateForTextBlock from '../../utils/formatDateForTextBlock'
import { useState } from 'react'
import style from './Task.module.css'

export default function Task({ id, name, description, deadline, completed, className, propsForTask }) {

    const { deleteTask, completeTask, openModalForEdit } = propsForTask

    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

    return (
        <div className={isDescriptionVisible ? className + ' ' + style.with - description : className} >

            <div className={style.wrapper}>

                <div className={style.square} onClick={() => completeTask(id)}>
                    {completed && <img src={tick} style={{ height: "27px" }} alt=""></img>}
                </div>

                <div className={style.text} onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}>
                    <p className={style.subject}>{name}</p>
                    <span className={style.deadline}>{formatDateForTextBlock(deadline)}</span>
                </div>

                <div className={style.square} onClick={() => deleteTask(id)}>
                    <img src={trash} style={{ height: "24px" }} alt=""></img>
                </div>

                <div className={style.square} onClick={() => openModalForEdit(id)} >
                    <img src={pencil} style={{ height: "25px" }} alt=""></img>
                </div>

            </div>

            {isDescriptionVisible && <div className={style.description}>{description}</div>}

        </div>
    )
}