export const States = {
    ALL: "ALL",
    CURRENT: "CURRENT",
    COMPLETED: "COMPLETED",
};

export const TaskListOptions = [
    { state: States.ALL, label: "All"},
    { state: States.CURRENT, label: "Current"},
    { state: States.COMPLETED, label: "Completed"},
];

export const filterFuncs = {
    [States.ALL]: () => { return true },
    [States.CURRENT]: (completed) => { return !completed },
    [States.COMPLETED]: (completed) => { return completed },
}
