import {addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, updateTodolistAC} from "./todolists-reducer";
import {todolistsType} from "../App";
import {v1} from "uuid";

let todolistID1: string
let todolistID2: string
let startState: Array<todolistsType>


beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()

    startState = [
        {id: todolistID1, title: "HTML", filter: 'all'},
        {id: todolistID2, title: "CSS", filter: 'all'}
    ]
})

test('new todolist should be added', () => {

    const title = "JS";

    const endState = todolistsReducer(startState, addTodolistAC(title))

    expect(endState[2].title).toBe("JS")
    expect(endState[2].filter).toBe("all")
    }
)


test ("todolist should be updated right", () => {

    const newTitle = "React"

    const endState = todolistsReducer(startState, updateTodolistAC(todolistID2, newTitle))

    expect(endState[1].title).toBe("React")
    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe("all")

} )

test("Filter should be changed right", () => {

    const endState = todolistsReducer(startState, changeFilterAC(todolistID1, "active"))

    expect(endState[0].filter).toBe('active');
    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('all');
})


test("Todolist should be removed", () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe("CSS")
})