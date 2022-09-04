import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void;
    updateTask: (todolistID: string, taskId: string, newTitle: string) => void;
    updateTodolist: (todolistID: string, newTitle: string) => void;
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistID, newTitle);
    }

    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.todolistID, newTitle)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID);
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callback={updateTodolistHandler}/>
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    const updateTaskHandler = (newTitle: string) => {
                        props.updateTask(props.todolistID, t.id, newTitle)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox defaultChecked size="small" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} callback={updateTaskHandler}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="secondary" size="small" onClick={onAllClickHandler}>all</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="success" size="small" onClick={onActiveClickHandler}>active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="error" size="small" onClick={onCompletedClickHandler}>completed</Button>
        </div>
    </div>
}
