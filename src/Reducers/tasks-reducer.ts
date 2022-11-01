import {TaskStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistType} from "./todolists-reducer";



type ActionType = RemoveTaskACType | AddTaskACType | ChangeStatusACType | UpdateTaskACType | AddTodolistACType | RemoveTodolistType;

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>

const initialState: TaskStateType = {};

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.id)}
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistID]: [...state[action.payload.todolistID], newTask]}
        case "CHANGE-STATUS":
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.id ? {...t, isDone: action.payload.isDone} : t)}
        case "UPDATE-TASK":
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.id ? {...t, title: action.payload.newTitle} : t)}
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistID]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistID]
            return stateCopy
        default:
            return state
    }
}


export const removeTaskAC = (todolistID: string, id: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistID, id
        }
    } as const
}

export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistID, title
        }
    } as const
}

export const changeStatusAC = (todolistID: string, id: string, isDone: boolean) => {
    return {
        type: "CHANGE-STATUS",
        payload: {
            todolistID, id, isDone
        }
    } as const
}

export const updateTaskAC = (todolistID: string, id: string, newTitle: string) => {
    return {
        type: "UPDATE-TASK",
        payload: {
            todolistID, id, newTitle
        }
    } as const
}

