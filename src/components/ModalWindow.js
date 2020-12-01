import React, { useRef } from 'react'
import { useGlobalContext } from '../context';

function ModalWindow() {
    const { selectedTask, hideModal, handleUpdateSubmit } = useGlobalContext();

    const dateInput = useRef();
    const nameInput = useRef();

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={hideModal}>&times;</span>
                <form >
                    <label htmlFor="fname">Дата:</label>
                    <input
                        type="text"
                        id="fname"
                        name="fname"
                        defaultValue={selectedTask.date}
                        ref={dateInput}
                    /><br />
                    <label htmlFor="lname">Наименование:</label>
                    <input
                        type="text"
                        id="lname"
                        name="lname"
                        defaultValue={selectedTask.name}
                        ref={nameInput}
                    /><br /><br />
                    <input
                        type="submit"
                        value="Подтвердить"
                        onClick={(e) => handleUpdateSubmit(e,
                            dateInput.current.value,
                            nameInput.current.value)}
                    />
                </form>
            </div>
        </div>
    )
}

export { ModalWindow }
