/* eslint-disable react/prop-types */
import { React, useEffect, useRef, useState } from "react";
import style from "./Modal.module.css";
import { CSSTransition } from "react-transition-group";

export function Modal({
  isModalOpened,
  onClose,
  titleInitial,
  descriptionInitial,
  deadlineInitial,
  makeChanges,
  blueButtonText,
}) {
  const [isOpen, setIsOpen] = useState(isModalOpened);
  useEffect(() => setIsOpen(isModalOpened), [isModalOpened]);
  const [title, setTitle] = useState(titleInitial);
  const [description, setDescription] = useState(descriptionInitial);
  const [deadline, setDeadline] = useState(deadlineInitial);
  const modal = useRef(null);

  return (
    <CSSTransition
      in={isOpen}
      nodeRef={modal}
      timeout={200}
      classNames={{
        enter: style.modal_enter,
        enterActive: style.modal_active_enter,
        exitActive: style.modal_active_exit,
      }}
      mountOnEnter
      unmountOnExit
    >
      <div
        className={style.modal}
        ref={modal}
        onMouseDown={() => {
          setIsOpen(false);
          onClose();
        }}
      >
        <div className={style.window} onMouseDown={(e) => e.stopPropagation()}>
          <input
            type="text"
            className={style.title}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className={style.textarea}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className={style.buttons}>
            <input
              type="datetime-local"
              className={style.date}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />

            <div className={style.space}></div>

            <button
              type="button"
              className={"button" + " " + style.add}
              onClick={() => {
                makeChanges(title, description, deadline);
                setIsOpen(false);
                onClose();
              }}
            >
              {blueButtonText}
            </button>

            <button
              type="button"
              className={"button" + " " + style.close}
              onClick={() => {
                setIsOpen(false);
                onClose();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
