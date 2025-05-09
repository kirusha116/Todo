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

export const FilterFuncs = {
    'ALL': () => { return true },
    'CURRENT': (completed) => { return !completed },
    'COMPLETED': (completed) => { return completed },
}
