/* eslint-disable react/prop-types */
import tick from "../../images/Tick.svg";
import trash from "../../images/Trash.svg";
import pencil from "../../images/Pencil.svg";
import formatDateForTextBlock from "../../utils/formatDateForTextBlock";
import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import style from "./Task.module.css";

export function Task({
  initVisible,
  title,
  description,
  deadline,
  completed,
  completeTask,
  deleteTask,
  onOpenEdit,
}) {
  const wrapper = useRef();
  const descriptionBlock = useRef();
  const [isVisible, setIsVisible] = useState(initVisible);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [heightOfDescription, setHeightOfDescription] = useState(0);

  useEffect(() => {
    if (!initVisible) {
      setHeightOfDescription(0);
      setTimeout(() => setIsDescriptionVisible(false), 400);
    }
    setIsVisible(initVisible);
  }, [initVisible]);

  useEffect(() => {
    if (isDescriptionVisible) {
      setHeightOfDescription(descriptionBlock.current.clientHeight);
    }
  }, [isDescriptionVisible, description]);

  return (
    <CSSTransition
      in={isVisible}
      nodeRef={wrapper}
      classNames={{
        enter: style.wrapper_enter,
        enterActive: style.wrapper_active_enter,
        enterDone: style.wrapper_done_enter,
        exit: style.wrapper_exit,
        exitActive: style.wrapper_active_exit,
      }}
      timeout={{
        appear: 0,
        enter: 400,
        exit: 400,
      }}
      appear
      mountOnEnter
      unmountOnExit
    >
      <div
        className={style.wrapper}
        ref={wrapper}
        style={{
          height:
            Boolean(heightOfDescription) && heightOfDescription + 80 + "px",
        }}
      >
        <div className={style.task}>
          <div className={style.square} onClick={completeTask}>
            {completed && (
              <img src={tick} style={{ height: "27px" }} alt=""></img>
            )}
          </div>

          <div
            className={style.text}
            onClick={() => {
              if (isDescriptionVisible) {
                setHeightOfDescription(0);
                setTimeout(() => setIsDescriptionVisible(false), 400);
              } else {
                setIsDescriptionVisible(true);
              }
            }}
          >
            <p className={style.subject}>{title}</p>
            <span className={style.deadline}>
              {formatDateForTextBlock(deadline)}
            </span>
          </div>

          <div
            className={style.square}
            onClick={() => {
              setIsVisible(false);
              deleteTask();
            }}
          >
            <img src={trash} style={{ height: "24px" }} alt=""></img>
          </div>

          <div className={style.square} onClick={onOpenEdit}>
            <img src={pencil} style={{ height: "25px" }} alt=""></img>
          </div>
        </div>

        {isDescriptionVisible && (
          <div className={style.description} ref={descriptionBlock}>
            {description}
          </div>
        )}
      </div>
    </CSSTransition>
  );
}
