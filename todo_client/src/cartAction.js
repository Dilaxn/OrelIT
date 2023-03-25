import { ADD_TASK, DELETE_TASK } from "./actionTypes";

const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

const deleteTask = () => {
    return {
        type: DELETE_TASK,
    };
};

export { addTask, deleteTask };
