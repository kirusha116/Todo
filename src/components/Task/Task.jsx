import tick from '../../images/Tick.svg'
import trash from '../../images/Trash.svg'
import pencil from '../../images/Pencil.svg'
import formatDateForTextBlock from '../../utils/formatDateForTextBlock'
import { useRef, useState } from 'react'
import style from './Task.module.css'
import { CSSTransition } from 'react-transition-group'

export function Task({
    title,
    description,
    deadline,
    completed,
    className,
    completeTask,
    deleteTask,
    openModal,
}) {

    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
    const task = useRef(null)

    return (

        <CSSTransition
            in={true}
            nodeRef={task}
            timeout={2000}
            mountOnEnter
            unmountOnExit
        >

            <div className={isDescriptionVisible ? className + ' ' + style.withDescription : className} ref={task}>

                <div className={style.wrapper}>

                    <div className={style.square} onClick={completeTask}>
                        {completed && <img src={tick} style={{ height: "27px" }} alt=""></img>}
                    </div>

                    <div className={style.text} onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}>
                        <p className={style.subject}>{title}</p>
                        {deadline && <span className={style.deadline}>{formatDateForTextBlock(deadline)}</span>}
                    </div>

                    <div className={style.square} onClick={deleteTask}>
                        <img src={trash} style={{ height: "24px" }} alt=""></img>
                    </div>

                    <div className={style.square} onClick={openModal} >
                        <img src={pencil} style={{ height: "25px" }} alt=""></img>
                    </div>

                </div>

                {isDescriptionVisible && <div className={style.description}>{description}</div>}

            </div>

        </CSSTransition>
    )
}