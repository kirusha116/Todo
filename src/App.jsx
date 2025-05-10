import './App.css'
import { useState } from 'react'
import { Selector } from './components/Selector'
import { Task } from './components/Task/Task'
import { Modal } from './components/Modal/Modal'
import { getRandomId } from './utils/getRandomId'
import { initTaskList } from './api/initTaskList'
import { saveTaskList } from './api/saveTaskList'
import { formatDateForInput } from './utils/formatDateForInput'
import { TaskListOptions, FilterFuncs } from './constants/Options'
import { TransitionGroup } from 'react-transition-group'
import { isTaskListEmpty } from './utils/isTaskListEmpty'


export default function App() {

  // delete localStorage.todo

  const [taskList, setTaskList] = useState(initTaskList())
  const [selectedState, setSelectedState] = useState('ALL')
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isModalForEdit, setIsModalForEdit] = useState(false)
  const [taskForEdit, setTaskForEdit] = useState({})
  const [filterFunc, setFilterFunc] = useState(() => () => { return true })

  return (
    <>
      <header className='header'>TODO LIST</header>

      <nav className="nav">

        <button className="button nav__button" onClick={() => { setIsModalForEdit(false), setIsModalOpened(true) }}>Add Task</button>

        <Selector
          selectedState={selectedState}
          selectState={(state) => setSelectedState(state)}
          options={TaskListOptions}
          FilterFuncs={FilterFuncs}
          setFilterFunc={setFilterFunc}
        />

      </nav>

      {/* Отрисовка списка задач */}
      <TransitionGroup component={'div'} className={'taskList'}>
        {taskList.map(task => {
          return <Task
            initVisible={filterFunc(task.completed)}
            key={task.id}
            title={task.title}
            description={task.description}
            deadline={task.deadline}
            completed={task.completed}
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
        })}
      </TransitionGroup>


      {/* Модалки */}
      <TransitionGroup component={null}>
        {/* Модалка для добавления новой задачи */}
        {!isModalForEdit &&
          <Modal
            key={Date.now()}
            isModalOpened={isModalOpened}
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
            isModalOpened={isModalOpened}
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