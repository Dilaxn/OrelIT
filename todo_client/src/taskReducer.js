import { ADD_TASK, DELETE_TASK, LOAD_TASKS_SUCCESS,UPDATE_TASK,COMPLETE_TASK } from "./actionTypes";

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
        case UPDATE_TASK:
            const updatedTasks = state.tasks.map((task) => {
                if (task.id === action.payload.id) {
                    console.log("-------", task)
                    console.log("+++++", action.payload)
                    return { ...task, ...action.payload };
                }
                console.log("taskkkk", task)
                return task;
            });
            return {
                ...state,
                tasks: updatedTasks,
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
}


export default taskReducer;
