import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks1, SetTasks] = useState([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ]);

    const DeleteTask = (id: string) => {
        SetTasks(tasks1.filter(task => {
            return task.id !== id;
        }))
    }

    const addTask = (value: string) => {
        SetTasks([...tasks1, {id: v1(), title: value, isDone: false}]);
    }

    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={tasks1}
                DeleteTask={DeleteTask}
                addTask={addTask}/>
        </div>
    );
}

export default App;
