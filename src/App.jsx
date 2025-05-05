import './App.css'
import { useState } from 'react'
import { Selector } from './components/Selector'
import { Task } from './components/Task/Task'
import { Modal } from './components/Modal/Modal'
import { makeStyleTask } from './utils/makeTaskStyle'
import { getRandomId } from './utils/getRandomId'
import { initTaskList } from './api/initTaskList'
import { saveTaskList } from './api/saveTaskList'
import { formatDateForInput } from './utils/formatDateForInput'
import { TaskListOptions } from './constants/TaskListOptions'
import { TransitionGroup } from 'react-transition-group'


export default function App() {

  // delete localStorage.todo

  const [taskList, setTaskList] = useState(initTaskList())
  const [selectedState, setSelectedState] = useState('ALL')
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isModalForEdit, setIsModalForEdit] = useState(false)
  const [taskForEdit, setTaskForEdit] = useState({})
  const [taskVisibleFunc, setTaskVisibleFunc] = useState({})

  return (
    <>
      <header className='header'>TODO LIST</header>

      <nav className="nav">

        <button className="button nav__button" onClick={() => { setIsModalForEdit(false), setIsModalOpened(true) }}>Add Task</button>

        <Selector
          selectedState={selectedState}
          selectState={(state) => setSelectedState(state)}
          options={TaskListOptions}
        />

      </nav>


      <TransitionGroup mode={'in-out'} component={null}>

        {/* Отрисовка списка задач */}
        {taskList.map(((task, index, tasks) => {
          return <Task
            key={task.id}
            title={task.title}
            description={task.description}
            deadline={task.deadline}
            completed={task.completed}
            className={makeStyleTask(index, tasks.length - 1)}
            completeTask={() => {
              const newTaskList = taskList.map(existTask => {
                if (existTask.id === task.id) { return { ...existTask, completed: !existTask.completed } }
                return existTask
              })
              setTaskList(newTaskList)
              saveTaskList(newTaskList)
            }}
            deleteTask={() => {
              const newTaskList = taskList.filter(existTask => existTask.id !== task.id)
              setTaskList(newTaskList)
              saveTaskList(newTaskList)
            }}
            openModal={() => {
              setTaskForEdit(task)
              setIsModalForEdit(true)
              setIsModalOpened(true)
            }} />
        }))}

      </TransitionGroup>

      <TransitionGroup mode={'out-in'} component={null}>

        {/* Модалка для добавления новой задачи */}
        {!isModalForEdit &&
          <Modal
            key={formatDateForInput(new Date())}
            isOpen={isModalOpened}
            titleInitial={""}
            descriptionInitial={""}
            deadlineInitial={formatDateForInput(new Date())}
            blueButtonText='Add task'
            onClose={() => setIsModalOpened(false)}
            makeChanges={(title, description, deadline) => {
              const newTaskList = [...taskList, { id: getRandomId(), title, description, deadline, completed: false }]
              setTaskList(newTaskList)
              saveTaskList(newTaskList)
            }}
          />
        }

        {/* Модалка для редактирования существующей задачи */}
        {isModalForEdit &&
          <Modal
            key={taskForEdit.id}
            isOpen={isModalOpened}
            titleInitial={taskForEdit.title}
            descriptionInitial={taskForEdit.description}
            deadlineInitial={taskForEdit.deadline}
            blueButtonText='Edit task'
            onClose={() => setIsModalOpened(false)}
            makeChanges={(title, description, deadline) => {
              const newTaskList = taskList.map((task) => {
                if (task.id === taskForEdit.id) { return { ...task, title, description, deadline } }
                return task
              })
              setTaskList(newTaskList)
              saveTaskList(newTaskList)
            }}
          />
        }

      </TransitionGroup>

    </>
  )
}