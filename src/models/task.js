import { getRandomId } from "../utils/getRandomId";

/*
type Task = {
    id: string;
    title: string;
    description: string;
    deadline: string;
    completed: boolean;
}
*/

export const createDraftTask = ({
  title = "",
  description = "",
  deadline = new Date(),
}) => {
  return {
    id: getRandomId(),
    title,
    description,
    completed: false,
    deadline,
  };
};
