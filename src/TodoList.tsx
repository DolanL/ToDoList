import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import Button from "./components/Button";


type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    DeleteTask: (id: string) => void;
    addTask: (value: string) => void;
}


export function TodoList(props: TodoListPropsType) {

    const [value, setValue] = useState('');

    const [filterTask, setFilterTask] = useState('All')

    let colander = props.tasks;

    if (filterTask === 'Active') {
        colander = props.tasks.filter(item => {
            return !item.isDone
        })
    }

    if (filterTask === 'Completed') {
        colander = props.tasks.filter(item => item.isDone)
    }

    const FilterTask = (name: FilterValuesType) => {
        setFilterTask(name);
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const addTaskHandler = () => {
        props.addTask(value);
        setValue('');
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            addTaskHandler();
        }
    }

    const deleteTaskHandler = (item: string) => {
        props.DeleteTask(item)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={value}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <Button name={'+'} callback={addTaskHandler}/>
            </div>
            <ul>
                {
                    colander.map(item => {
                        return (
                            <li key={item.id}><input type="checkbox" checked={item.isDone}/>
                                <span>{item.title}</span>
                                <Button name={'x'} callback={() => deleteTaskHandler(item.id)}/>
                            </li>

                        )
                    })}
            </ul>
            <div>
                <Button name={'All'} callback={() => FilterTask('All')}/>
                <Button name={'Active'} callback={() => FilterTask('Active')}/>
                <Button name={'Completed'} callback={() => FilterTask('Completed')}/>
            </div>
        </div>
    );
}