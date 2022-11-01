import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./Reducers/todolists-reducer";
import {tasksReducer} from "./Reducers/tasks-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store