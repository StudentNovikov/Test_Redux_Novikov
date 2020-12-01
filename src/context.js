import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';

const AppContext = React.createContext();
const initialState = {
    isModalShown: false,
    selectedTask: {},
    tasks: [],
    filteredTasks: [],
    isFilterActive: false
}

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getLocalStorage();
    }, [])

    useEffect(() => {
        updateFilteredTasks();
    }, [state.isFilterActive, state.tasks])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }, [state.tasks])

    useEffect(() => {
        dispatch({ type: 'UPDATE_TASKS' });
    }, [state.selectedTask])

    function getLocalStorage() {
        dispatch({ type: 'GET_INITIAL_TASKS_FROM_STORAGE' });
    }

    function handleFilterChange() {
        dispatch({ type: 'TOGGLE_FILTER' })
    }

    function handleStatusChange(id) {
        dispatch({ type: 'CHANGE_STATUS', payload: id });
    }

    function updateFilteredTasks() {
        dispatch({ type: 'UPDATE_FILTERED_TASKS' })
    }

    function handleDelete(id) {
        dispatch({ type: 'DELETE_TASK', payload: id })
    }

    function handleUpdate(id) {
        dispatch({ type: 'UPDATE_TASK', payload: id });
    }

    function hideModal() {
        dispatch({ type: 'HIDE_MODAL' })
    }

    function handleUpdateSubmit(e, date, name) {
        e.preventDefault();
        dispatch({ type: 'SUBMIT_UPDATE', payload: { date, name } });
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                handleFilterChange,
                handleStatusChange,
                handleDelete,
                handleUpdate,
                hideModal,
                handleUpdateSubmit,
            }}
        >
            {children}
        </AppContext.Provider>

    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppProvider }