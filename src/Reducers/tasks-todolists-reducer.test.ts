import {addTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-reducer";
import {TaskStateType, todolistsType} from "../AppWithRedux";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";

test("ids should be equal", () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<todolistsType> = [];

    const action = addTodolistAC("new Todolist")

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);

    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTasks).toEqual(idFromTodolists);
})

test("todolist in tasks and in todolist should be deleted", () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    let startTasksState = {
        [todolistID1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
            {id: "4", title: "Rest API", isDone: false},
            {id: "5", title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: "1", title: "HTML&CSS2", isDone: true},
            {id: "2", title: "JS2", isDone: true},
            {id: "3", title: "ReactJS2", isDone: false},
            {id: "4", title: "Rest API2", isDone: false},
            {id: "5", title: "GraphQL2", isDone: false},
        ]
    }

    const startTodolistsState: Array<todolistsType> = [
        {id: todolistID1, title: "Todolist1", filter: 'all'},
        {id: todolistID2, title: "Todolist2", filter: 'all'}
    ]

    let action = removeTodolistAC(todolistID1)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    let keys = Object.keys(endTasksState)

    expect(keys[0]).toEqual(endTodolistsState[0].id)
    expect(endTodolistsState.length).toBe(1)
    expect(endTasksState[todolistID1]).toBeUndefined()
})