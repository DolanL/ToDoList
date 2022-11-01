import {changeStatusAC, removeTaskAC, updateTaskAC} from "../Reducers/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {TaskType} from "../Todolist";


type TaskPropsType = {
    todolistID: string
    task: TaskType
}


export const Task: React.FC<TaskPropsType> = React.memo(({task, todolistID}) => {

    const dispatch = useDispatch();


    const onClickHandler = () => dispatch(removeTaskAC(todolistID, task.id))

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusAC(todolistID, task.id, e.currentTarget.checked));
    }

    const updateTaskHandler = useCallback((newTitle: string) => {
        dispatch(updateTaskAC(todolistID, task.id, newTitle))
    },[dispatch, task.id, todolistID])

    return <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox size="small" onChange={onChangeHandler} checked={task.isDone}/>
        <EditableSpan title={task.title} callback={updateTaskHandler}/>
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </li>
})

