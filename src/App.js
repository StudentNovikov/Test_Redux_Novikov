import './App.css';
import { Table } from './components/Table';
import React from 'react';
import { ModalWindow } from './components/ModalWindow';
import { useGlobalContext } from './context';


function App() {
  const { isModalShown } = useGlobalContext();

  return (
    <div className="App">
      {isModalShown &&
        <ModalWindow />
      }
      <Table />
    </div>
  );
}

export default App;
