import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "a16bf247-86f1-4ef4-99af-302bbb5da3d0"
    }
})


export const APITodolist = {

    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
    },
    updateTodolist(todolistID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistID}`, {title})
    },

    getTasks (todolistID: string) {
        return instance.get(`todo-lists/${todolistID}/tasks`)
    },
    createTask (todolistID: string, title: string) {
        return instance.post(`todo-lists/${todolistID}/tasks`, {title})
    },
    updateTask (todolistID: string, taskID: string, title: string) {
        return instance.put(`todo-lists/${todolistID}/tasks/${taskID}`, {title})
    },
    deleteTask (todolistID: string, taskID: string) {
        return instance.delete(`todo-lists/${todolistID}/tasks/${taskID}`)
    }

}

type ResponseType<T = {}> = {
    data: T
    fieldsError: string[]
    resultCode: number
    messages: [],
}


type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

