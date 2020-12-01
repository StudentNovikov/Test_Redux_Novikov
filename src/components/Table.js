import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';

const Table = () => {

    const { tasks, filteredTasks, handleStatusChange, handleFilterChange, handleDelete, handleUpdate } = useGlobalContext();

    // const defaultTable = [
    //     {
    //         id: 1,
    //         name: 'Сверстать',
    //         date: 'хх.хх.хххх',
    //         status: false
    //     },
    //     {
    //         id: 2,
    //         name: 'Закодить',
    //         date: 'хх.хх.хххх',
    //         status: false
    //     }
    // ];

    // const [tasks, setTasks] = useState(getLocalStorage());
    // const [filteredTasks, setFilteredTasks] = useState(tasks);
    // const [isFilterActive, setIsFilterActive] = useState(false);


    // function handleStatusChange(id) {
    //     const newTasks = tasks.map(task => {
    //         if (task.id === id) {
    //             const status = !task.status;
    //             return {
    //                 ...task,
    //                 status
    //             }
    //         }
    //         return task
    //     })
    //     setTasks(newTasks);
    // }

    // useEffect(() => {
    //     updateFilteredTasks();
    // }, [isFilterActive, tasks])

    // useEffect(() => {
    //     const updatedTasks = tasks.map(task => {
    //         if (task.id !== selectedTask.id) {
    //             return task
    //         }
    //         return selectedTask
    //     })
    //     setTasks(updatedTasks);
    // }, [selectedTask])

    // useEffect(() => {
    //     localStorage.setItem('tasks', JSON.stringify(tasks))
    // }, [tasks])

    // function getLocalStorage() {
    //     let storageTasks = JSON.parse(localStorage.getItem('tasks'));
    //     if (storageTasks && storageTasks.length !== 0) {
    //         return JSON.parse(localStorage.getItem('tasks'))
    //     }
    //     return defaultTable
    // }

    // function updateFilteredTasks() {
    //     if (!isFilterActive) {
    //         setFilteredTasks(tasks);
    //     } else {
    //         const newFilteredTasks = tasks.filter(task => task.status !== true);
    //         setFilteredTasks(newFilteredTasks);
    //     }
    // }

    // function handleFilterChange() {
    //     setIsFilterActive(!isFilterActive);
    // }

    // function handleDelete(id) {
    //     const newTasks = tasks.filter(task => task.id !== id);
    //     setTasks(newTasks);
    // }

    // function handleUpdate(id) {
    //     const targetTask = tasks.find(task => task.id === id);
    //     setSelectedTask(targetTask);
    //     setIsModalShown(true);
    // }

    return (
        <>
            <div className="filter">
                <input
                    type="checkbox"
                    id="filter"
                    onChange={handleFilterChange}
                />
                <label htmlFor='filter'>Скрыть выполненные</label>
            </div>
            {filteredTasks.length !== 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Наименование</th>
                            <th>Дата</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map(({ id, name, date, status }) => {
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{date}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={status}
                                            onChange={() => handleStatusChange(id)}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => handleUpdate(id)}>редактировать</button>
                                        <button onClick={() => handleDelete(id)}>удалить</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </>
    )
}

export { Table }