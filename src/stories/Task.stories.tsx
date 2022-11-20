import React from "react";
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";

export default {
    title: "Task component",
    component: Task
}

const changeTaskStatusCallBack = action("changeTaskStatus was called")
const changeTaskTitleCallBack = action("changeTaskTitle was called")
const removeTaskCallBack = action("removeTask was called")

export const TaskBaseExample = (props: any) => {
    return (
        <>
            <Task
                changeTaskStatus={changeTaskStatusCallBack}
                changeTaskTitle={changeTaskTitleCallBack}
                removeTask={removeTaskCallBack}
                task={{ id: "1", title: "JS", isDone: true }}
                todolistId={"TodolistId1"}/>
            <Task
                changeTaskStatus={changeTaskStatusCallBack}
                changeTaskTitle={changeTaskTitleCallBack}
                removeTask={removeTaskCallBack}
                task={{ id: "1", title: "JS", isDone: false }}
                todolistId={"TodolistId1"}/>

        </>
    )
}