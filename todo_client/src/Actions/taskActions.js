// types.js
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const LOAD_TASKS_SUCCESS = 'LOAD_TASKS_SUCCESS';

// actions.js
export const getAllTasks = (task) => ({
    type: LOAD_TASKS_SUCCESS,
    payload: task,
});

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

export const updateTask = (id, task) => ({
    type: UPDATE_TASK,
    payload: { id, task },
});

export const deleteTask = (id) => ({
    type: DELETE_TASK,
    payload: id,
});

export const completeTask = (id) => ({
    type: COMPLETE_TASK,
    payload: id,
});
