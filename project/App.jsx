import { useEffect, useState } from 'react'
import './App.css'
import Selector from './Selector'
import Task from './Task'
import Modal from './Modal'
import loadTaskListFromStorageOrCreateNewEmptyTaskList from './functions/loadTaskListFromStorageOrCreateNewEmptyTaskList'
import makeStyleTask from './functions/makeTaskStyle'
import filterTasksBySelectedState from './functions/filterTasksBySelectedState'
import createNewTaskObj from './functions/createNewTaskObj'
import getRandomId from './functions/getRandomId'

export default function App() {

  // delete localStorage.todo

  const [taskList, setTaskList] = useState(loadTaskListFromStorageOrCreateNewEmptyTaskList())
  const [selectedState, setSelectedState] = useState('ALL')
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isModalForEdit, setIsModalForEdit] = useState(false)
  const [taskForAddOrEdit, setTaskForAddOrEdit] = useState({})

  useEffect(() => { localStorage.todo = JSON.stringify(taskList) }, [taskList])

  const propsForSelector = {
    selectedState,
    setSelectedState,
  }

  const propsForModal = {
    isModalOpened,
    setIsModalOpened,
    isModalForEdit,
    replaceTaskInTaskList: (name, description, deadline) => setTaskList(taskList.map(task => {
      if (task.id === taskForAddOrEdit.id) {
        return { ...task, name, description, deadline }
      }
      return task
    })),
    addNewTask: (name, description, deadline) => setTaskList([...taskList, createNewTaskObj(name, description, deadline)]),
    nameForEdit: taskForAddOrEdit.name,
    descriptionForEdit: taskForAddOrEdit.description,
    deadlineForEdit: taskForAddOrEdit.deadline,
  }



  const propsForTask = {
    deleteTask: id => setTaskList(taskList.filter(task => task.id !== id)),
    completeTask: id => setTaskList(taskList.map(task => {
      if (task.id = id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })),
    openModalForEdit: id => { setTaskForAddOrEdit(taskList.find(task => task.id === id)), setIsModalForEdit(true), setIsModalOpened(true) }
  }

  return (
    <>
      <header className='header'>TODO LIST</header>

      <div className="nav">

        <button className="button nav__button" onClick={() => {
          setTaskForAddOrEdit(createNewTaskObj())
          setIsModalForEdit(false)
          setIsModalOpened(true)
        }}
        >Add Task
        </button>

        <Selector propsForSelector={propsForSelector} />

      </div>

      {filterTasksBySelectedState(selectedState, taskList).map(((task, index, tasks) => {
        return <Task
          key={getRandomId()}
          id={task.id}
          name={task.name}
          description={task.description}
          deadline={task.deadline}
          completed={task.completed}
          className={makeStyleTask(index, tasks.length - 1)}
          propsForTask={propsForTask} />
      }))}

      <Modal propsForModal={propsForModal} />

    </>
  )
}