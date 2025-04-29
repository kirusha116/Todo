import ModalV2 from "./Modal/Modal";
import { createDraftTask } from "../models/task";

const content = createDraftTask();

export const AddTaskModal = (props) => {
  return <ModalV2 {...props} content={content} />;
};
