import React, {useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state";
import {addTaskAC} from "./Reducers/tasks-reducer";
import {Task} from "./components/Task"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void;
    updateTodolist: (todolistID: string, newTitle: string) => void;
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist")

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])
    const dispatch = useDispatch();

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(props.todolistID, title))
    }, [props.todolistID, dispatch])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistID, "all"), [props.changeFilter, props.todolistID]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistID, "active"), [props.changeFilter, props.todolistID]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistID, "completed"),[props.changeFilter, props.todolistID]);


    const updateTodolistHandler = useCallback((newTitle: string) => {
        props.updateTodolist(props.todolistID, newTitle)
    }, [props.updateTodolist, props.todolistID])

    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolistID);
    }, [props.removeTodolist, props.todolistID])


    let tasksForTodolist = tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
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
                tasksForTodolist.map(t => {
                    return <Task key={t.id} todolistID={props.todolistID} task={t}/>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="secondary" size="small" onClick={onAllClickHandler}>all</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="success" size="small" onClick={onActiveClickHandler}>active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="error" size="small" onClick={onCompletedClickHandler}>completed</Button>
        </div>
    </div>
})
