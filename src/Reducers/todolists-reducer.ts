import {FilterValuesType, todolistsType} from "../AppWithRedux";
import {v1} from "uuid";

type ActionType = AddTodolistACType | UpdateTodolistType | ChangeFilterType | RemoveTodolistType
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type UpdateTodolistType = ReturnType<typeof updateTodolistAC>
type ChangeFilterType = ReturnType<typeof changeFilterAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>

const initialState: Array<todolistsType> = []

export const todolistsReducer = (state: Array<todolistsType> = initialState, action: ActionType): Array<todolistsType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            let newTodolist: todolistsType = {id: action.payload.todolistID, title: action.payload.title, filter: "all"};
            return [...state, newTodolist]
        case "UPDATE-TODOLIST":
            return state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.newTitle} : el)
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.payload.todolistID ? {...el, filter: action.payload.filter} : el)
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.payload.todolistID)
        default:
            return state
    }
}

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title, todolistID: v1(),
        }
    } as const
}

export const updateTodolistAC = (todolistID: string, newTitle: string) => {
    return {
        type: "UPDATE-TODOLIST",
        payload: {
            todolistID, newTitle
        }
    } as const
}

export const changeFilterAC = (todolistID: string, filter: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            todolistID, filter
        }
    } as const
}

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {todolistID}
    } as const
}
