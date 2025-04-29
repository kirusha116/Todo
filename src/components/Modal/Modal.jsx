import { useEffect, useState } from "react";
import style from "./Modal.module.css";

// type Content = {
// title: string, description: string, deadline: string
// }

// type Modal = {
//  isOpen: boolean
//  onClose: () => void;
//  onButtonApply: (data: Content) => void;
//  buttonApplyTitle: string
//  content: Content
// }

export default function ModalV2({
  isOpen,
  onClose,
  onButtonApply,
  buttonApplyTitle,
  content,
}) {
  const [name, setName] = useState(content.title);
  const [description, setDescription] = useState(content.description);
  const [deadline, setDeadline] = useState(content.deadline);

  return (
    <div
      className={isOpen ? style.modal + " " + style.modal_active : style.modal}
      onClick={onClose}
    >
      <div
        className={
          isOpen ? `${style.window} ${style.window_active}` : style.window
        }
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          className={style.name}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
              onButtonApply({ title, description, deadline });
              setIsModalOpened(false);
            }}
          >
            {buttonApplyTitle}
          </button>

          <button
            type="button"
            className={"button" + " " + style.close}
            onClick={() => setIsModalOpened(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
