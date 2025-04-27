import { useEffect, useState } from "react"
import './styles/Modal.css'

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
        <div className={isModalOpened ? "modal modal_active" : "modal"} onClick={() => setIsModalOpened(false)}>

            <div className={isModalOpened ? "modal__window modal__window_active" : "modal__window"} onClick={e => e.stopPropagation()}>

                <input type="text"
                    className="modal__name"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <textarea className="modal__textarea"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <div className='modal__buttons'>

                    <input type="datetime-local"
                        className="modal__date"
                        value={deadline}
                        onChange={e => setDeadline(e.target.value)}
                    />

                    <div className="modal__space"></div>

                    <button type="button"
                        className='button modal__add'
                        onClick={() => { 
                            if (isModalForEdit) {
                                replaceTaskInTaskList(name, description, deadline)
                            } else {
                                addNewTask(name, description, deadline)
                            }
                            setIsModalOpened(false) }}
                    >{isModalForEdit ? 'Edit task' : 'Add Task'}
                    </button>

                    <button type="button"
                        className='button modal__close'
                        onClick={() => setIsModalOpened(false)}
                    >Close
                    </button>

                </div>

            </div>

        </div>
    )
}