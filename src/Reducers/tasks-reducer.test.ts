import {v1} from "uuid";
import {addTaskAC, changeStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from "./tasks-reducer";
import {addTodolistAC} from "./todolists-reducer";
import {TaskStateType} from "../AppWithReducers";

let todolistID1: string
let todolistID2: string
let startState: TaskStateType



beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()

    startState = {
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
})


test("Tasks should be removed", () => {

    let endState = tasksReducer(startState, removeTaskAC(todolistID1, "1"))


    expect(endState[todolistID1][0].id).toBe("2")
    expect(endState[todolistID1].length).toBe(4);
    expect(endState[todolistID2].length).toBe(5);
})

test("Task should be added", () => {

    let newTitle = "SQL"

    let endState = tasksReducer(startState, addTaskAC(todolistID2, newTitle))

    expect(endState[todolistID2][5].title).toBe(newTitle)
    expect(endState[todolistID2].length).toBe(6);
    expect(endState[todolistID1].length).toBe(5);
    expect(endState[todolistID1][0].title).toBe("HTML&CSS")

})

test("Status should be changed", () => {

    let endState = tasksReducer(startState, changeStatusAC(todolistID1, "1", false))

    expect(endState[todolistID1][0].isDone).toBeFalsy()
    expect(endState[todolistID2][0].isDone).toBeTruthy()
    expect(endState[todolistID2].length).toBe(5);
})

test("Title should be updated", () => {

    const newTitle = "NewTitle"

    const endState = tasksReducer(startState, updateTaskAC(todolistID1, "1", newTitle))

    expect(endState[todolistID1][0].title).toBe("NewTitle")
    expect(endState[todolistID2][0].title).toBe("HTML&CSS2")
    expect(endState[todolistID1].length).toBe(5)

})

test("new array should be added when todolist is added", () => {

    const endState = tasksReducer(startState, addTodolistAC("Title no matter"))

    let keys = Object.keys(endState)

    let newKey = keys.find(t => t !== todolistID1 && t !== todolistID2)

    if (!newKey) {
        throw Error("Key didnt found")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([]);
})