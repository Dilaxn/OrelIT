import axios from "axios";


// reducer.js
import { ADD_TASK, UPDATE_TASK, DELETE_TASK, COMPLETE_TASK } from './types';

const initialState = {
    tasks: [],
};

const taskReducer2 = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, { ...action.payload }],
            };
        case UPDATE_TASK:
            const updatedTasks = state.tasks.map((task) => {
                if (task.id === action.payload.id) {
                    return { ...task, ...action.payload.task };
                }
                return task;
            });
            return {
                ...state,
                tasks: updatedTasks,
            };
        case DELETE_TASK:
            const filteredTasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
            return {
                ...state,
                tasks: filteredTasks,
            };
        case COMPLETE_TASK:
            const completedTasks = state.tasks.map((task) => {
                if (task.id === action.payload) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            });
            return {
                ...state,
                tasks: completedTasks,
            };
        default:
            return state;
    }
};

export const getTasks = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/task`, {
        });
        console.log(res.data)
        // dispatch({ type: LOAD_ALL_ADDRESS_SUCCESS, payload });
        return true;
    } catch (e) {
        // dispatch({ type: LOAD_ALL_ADDRESS_FAIL });
        console.log("error")
    }
};

export default taskReducer2;
