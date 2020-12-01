const defaultTable = [
    {
        id: 1,
        name: 'Сверстать',
        date: 'хх.хх.хххх',
        status: false
    },
    {
        id: 2,
        name: 'Закодить',
        date: 'хх.хх.хххх',
        status: false
    }
];

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_INITIAL_TASKS_FROM_STORAGE':
            {
                let storageTasks = JSON.parse(localStorage.getItem('tasks'));
                if (storageTasks && storageTasks.length !== 0) {
                    return {
                        ...state,
                        tasks: JSON.parse(localStorage.getItem('tasks'))
                    }
                }
                return {
                    ...state,
                    tasks: defaultTable
                }
            }
        case 'TOGGLE_FILTER':
            {
                const isFilterActive = !state.isFilterActive;
                return {
                    ...state,
                    isFilterActive
                }
            }
        case 'CHANGE_STATUS':
            {
                const newTasks = state.tasks.map(task => {
                    if (task.id === action.payload) {
                        const status = !task.status;
                        return {
                            ...task,
                            status
                        }
                    }
                    return task
                })
                return {
                    ...state,
                    tasks: newTasks
                }
            }
        case 'UPDATE_FILTERED_TASKS':
            {
                if (!state.isFilterActive) {
                    return {
                        ...state,
                        filteredTasks: state.tasks
                    }
                }
                const newFilteredTasks = state.tasks.filter(task => task.status !== true);
                return {
                    ...state,
                    filteredTasks: newFilteredTasks
                }
            }
        case 'DELETE_TASK':
            {
                const newTasks = state.tasks.filter(task => task.id !== action.payload);
                return {
                    ...state,
                    tasks: newTasks
                }
            }
        case 'UPDATE_TASK': {
            const targetTask = state.tasks.find(task => task.id === action.payload);
            return {
                ...state,
                selectedTask: targetTask,
                isModalShown: true
            }
        }
        case 'UPDATE_TASKS': {
            const updatedTasks = state.tasks.map(task => {
                if (task.id !== state.selectedTask.id) {
                    return task
                }
                return state.selectedTask
            })
            return {
                ...state,
                tasks: updatedTasks
            }
        }
        case 'HIDE_MODAL': {
            return {
                ...state,
                isModalShown: false
            }
        }
        case 'SUBMIT_UPDATE': {
            const selectedTask = {
                ...state.selectedTask,
                name: action.payload.name,
                date: action.payload.date
            }
            return {
                ...state,
                selectedTask,
                isModalShown: false
            }
        }
        default:
            return state
    }
}

export default reducer;