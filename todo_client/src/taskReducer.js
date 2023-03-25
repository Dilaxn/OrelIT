import { ADD_TASK, DELETE_TASK, LOAD_TASKS_SUCCESS } from "./actionTypes";

const initialState = {
    tasks: [],
};

 const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, { ...action.payload }],
            };

        case DELETE_TASK:
            const filteredTasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
            return {
                ...state,
                tasks: filteredTasks,
            };

        case LOAD_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
            };

        default:
            return state;
    }
}


export default taskReducer;
