import { useEffect, useState } from "react"
import style from './styles/Modal.module.css'


export default function Modal({ propsForModal }) {

    const { isModalOpened, setIsModalOpened, isModalForEdit, replaceTaskInTaskList, addNewTask, nameForEdit, descriptionForEdit, deadlineForEdit } = propsForModal

    const [name, setName] = useState(nameForEdit)
    const [description, setDescription] = useState(descriptionForEdit)
    const [deadline, setDeadline] = useState(deadlineForEdit)

    useEffect(() => {
        if (isModalOpened) {
            setName(nameForEdit)
            setDescription(descriptionForEdit)
            setDeadline(deadlineForEdit)
        }
    }, [isModalOpened])

    return (
        <div className={isModalOpened ? style.modal + ' ' + style.modal_active : style.modal} onClick={() => setIsModalOpened(false)}>

            <div className={isModalOpened ? style.window + ' ' + style.window_active : style.window} onClick={e => e.stopPropagation()}>

                <input type="text"
                    className={style.name}
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <textarea className={style.textarea}
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <div className={style.buttons}>

                    <input type="datetime-local"
                        className={style.date}
                        value={deadline}
                        onChange={e => setDeadline(e.target.value)}
                    />

                    <div className={style.space}></div>

                    <button type="button"
                        className={'button' + ' ' + style.add}
                        onClick={() => {
                            if (isModalForEdit) {
                                replaceTaskInTaskList(name, description, deadline)
                            } else {
                                addNewTask(name, description, deadline)
                            }
                            setIsModalOpened(false)
                        }}
                    >{isModalForEdit ? 'Edit task' : 'Add Task'}
                    </button>

                    <button type="button"
                        className={'button' + ' ' + style.close}
                        onClick={() => setIsModalOpened(false)}
                    >Close
                    </button>

                </div>

            </div>

        </div>
    )
}