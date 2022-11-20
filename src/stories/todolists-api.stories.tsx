import React, {ChangeEvent, useEffect, useState} from 'react'
import axios from "axios";
import {APITodolist} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        APITodolist.getTodolist().then((res) => {
            setState(res.data)
        })
            .catch((e) => {
                console.log(e)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        APITodolist.createTodolist("JS")
            .then((res) => {
                setState(res.data.data.item)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = "0a5ae46a-f04e-42d5-9c88-40d6c8692bd3"
        APITodolist.deleteTodolist(todolistID)
            .then((res) => {
                setState(res.data)
            }).catch((e) => {
            console.log(e)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistID = "af68abd2-4dbb-47f7-9f79-7133418621a0"
        APITodolist.updateTodolist(todolistID, 'XDD')
            .then((res) => {
                setState(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])


    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState("")


    const inputTodolistIDHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value);
    }

    const onClickHandler = () => {
        APITodolist.getTasks(todolistID)
            .then((res) => {
                setState(res.data.items)
            })
            .catch(() => {
                setState("ERROR")
            })
    }

    return (
        <div>
            <input onChange={inputTodolistIDHandler} type="text" value={todolistID}/>
            <button onClick={onClickHandler}>get Tasks</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const CreateTasks = () => {
    const [state, setState] = useState(null)
    const [todolistID, setTodolistID] = useState("")
    const [title, setTitle] = useState("")

    const onChangeHandlerTodolistID = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value)
    }

    const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        APITodolist.createTask(todolistID, title)
            .then((res) => {
                setState(res.data)
            })
            .catch((e) => {
                setState(e)
            })
    }


    return (
        <div>
            <input type="text" placeholder={"get me todolistID"} onChange={onChangeHandlerTodolistID} value={todolistID}/>
            <input type="text" onChange={onChangeHandlerTitle} placeholder={"get me title"} value={title}/>
            <button onClick={onClickHandler}>create task</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )

}


export const UpdateTask = () => {

    const [state, setState] = useState(null)
    const [todolistID, setTodolistID] = useState("")
    const [taskID, setTaskID] = useState("")
    const [newTitle, setNewTitle] = useState("")


    const onChangeTodolistIDHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value)
    }

    const onChangeTaskIDHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskID(e.currentTarget.value)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    //a8b7a8b4-ae10-43fb-9bb9-fd8a1f00ae4f

    //182d46de-967c-4d75-9a2a-c35bcb3eb81d
    const onClickHandler = () => {
        APITodolist.updateTask(todolistID, taskID, newTitle)
            .then((res) => {
                setState(res.data)
            })
            .catch((e) => {
                setState(e)
            })
    }


    return (
        <div>
            <input onChange={onChangeTodolistIDHandler} value={todolistID}/>
            <input onChange={onChangeTaskIDHandler} value={taskID}/>
            <input onChange={onChangeTitleHandler} value={newTitle}/>
            <button onClick={onClickHandler}>change Task Title</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState(null)
    const [todolistID, setTodolistID] = useState("")
    const [taskID, setTaskID] = useState("")

    const onChangeTodolistIDHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value)
    }

    const onChangeTaskIDHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskID(e.currentTarget.value)
    }

    //a8b7a8b4-ae10-43fb-9bb9-fd8a1f00ae4f

    //182d46de-967c-4d75-9a2a-c35bcb3eb81d
    const onClickHandler = () => {
        APITodolist.deleteTask(todolistID, taskID)
            .then((res) => {
                setState(res.data)
            })
            .catch((e) => {
                setState(e)
            })
    }


    return (
        <div>
            <input placeholder={"todolistID"} onChange={onChangeTodolistIDHandler} value={todolistID}/>
            <input placeholder={"taskID"} onChange={onChangeTaskIDHandler} value={taskID}/>
            <button onClick={onClickHandler}>delete Task</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )

}