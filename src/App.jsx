import { useEffect, useState } from "react";
import "./App.css";
import Task from "../project/Task";
import Modal from "../project/Modal";
// import initTaskList from "../project/functions/loadTaskListFromStorageOrCreateNewEmptyTaskList";
import makeStyleTask from "../project/functions/makeTaskStyle";
import filterTasksBySelectedState from "../project/functions/filterTasksBySelectedState";
import createNewTaskObj from "../project/functions/createNewTaskObj";
import getRandomId from "../project/functions/getRandomId";

import { State, TaskListOptions } from "./models/taskList";
import { initTaskList } from "./api/getTaskList";
import { saveTaskList } from "./api/saveTaskList";
import { SelectorV2 } from "./components/SelectorV2";
import { AddTaskModal } from "./components/AddTaskModal";
import { EditTaskModal } from "./components/EditTaskModal";

export default function App() {
  // delete localStorage.todo

  const [taskList, setTaskList] = useState(initTaskList());
  const [selectedState, setSelectedState] = useState(State.App);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isModalForEdit, setIsModalForEdit] = useState(false);
  const [taskForAddOrEdit, setTaskForAddOrEdit] = useState({});

  // save data
  // TODO: remove useEffect
  useEffect(() => {
    saveTaskList(taskList);
  }, [taskList]);

  const propsForModal = {
    isModalOpened,
    setIsModalOpened,
    isModalForEdit,
    replaceTaskInTaskList: (name, description, deadline) =>
      setTaskList(
        taskList.map((task) => {
          if (task.id === taskForAddOrEdit.id) {
            return { ...task, name, description, deadline };
          }
          return task;
        })
      ),
    addNewTask: (name, description, deadline) =>
      setTaskList([...taskList, createNewTaskObj(name, description, deadline)]),
    nameForEdit: taskForAddOrEdit.name,
    descriptionForEdit: taskForAddOrEdit.description,
    deadlineForEdit: taskForAddOrEdit.deadline,
  };

  const propsForTask = {
    deleteTask: (id) => setTaskList(taskList.filter((task) => task.id !== id)),
    completeTask: (id) =>
      setTaskList(
        taskList.map((task) => {
          if ((task.id = id)) {
            return { ...task, completed: !task.completed };
          }
          return task;
        })
      ),
    openModalForEdit: (id) => {
      setTaskForAddOrEdit(taskList.find((task) => task.id === id)),
        setIsModalForEdit(true),
        setIsModalOpened(true);
    },
  };

  return (
    <>
      <header className="header">TODO LIST</header>

      <div className="nav">
        <button
          className="button nav__button"
          onClick={() => {
            setTaskForAddOrEdit(createNewTaskObj());
            setIsModalForEdit(false);
            setIsModalOpened(true);
          }}
        >
          Add Task
        </button>

        <SelectorV2
          options={TaskListOptions}
          selectedOptionValue={selectedState}
          onItemSelect={setSelectedState}
        />
      </div>

      {filterTasksBySelectedState(selectedState, taskList).map(
        (task, index, tasks) => {
          return (
            <Task
              key={getRandomId()}
              id={task.id}
              name={task.name}
              description={task.description}
              deadline={task.deadline}
              completed={task.completed}
              className={makeStyleTask(index, tasks.length - 1)}
              propsForTask={propsForTask}
            />
          );
        }
      )}

      {/* <Modal propsForModal={propsForModal}
      isOpen={}
  onClose={}
  onButtonApply={}
  buttonApplyTitle={}
  content={} 
      /> */}
      {isModalForEdit ? <EditTaskModal /> : <AddTaskModal />}
    </>
  );
}
