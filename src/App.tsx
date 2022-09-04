import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";

type todolistsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function addTodolist(newTitle: string) {
        let newTodolistID = v1();
        setTodolists([...todolists, {id: newTodolistID, title: newTitle, filter: 'all'}])
        setTasks({...tasks, [newTodolistID]: []})
    }

    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id)})
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todolistID]: [...tasks[todolistID], newTask]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskId ? {...task, isDone} : task)})
    }


    const updateTask = (todolistID: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }

    const updateTodolist = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(td => td.id === todolistID ? {...td, filter: value} : td))
    }

    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(td => td.id !== todolistID))
        delete tasks[todolistID];
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(el => {
                            let tasksForTodolist = tasks[el.id];

                            if (el.filter === "active") {
                                tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                            }
                            if (el.filter === "completed") {
                                tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist
                                            key={el.id}
                                            todolistID={el.id}
                                            title={el.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            removeTodolist={removeTodolist}
                                            updateTask={updateTask}
                                            filter={el.filter}
                                            updateTodolist={updateTodolist}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    {todolists.length !== 0 ? '' : <div>Empty</div>}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
