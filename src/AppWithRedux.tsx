import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import AddItemForm from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    updateTodolistAC
} from "./Reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state";

export type FilterValuesType = "all" | "active" | "completed";

export type todolistsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}


export type TaskStateType = {
    [todolistID: string] : Array<TaskType>
}

function AppWithRedux() {
    console.log("App")

    const todolists = useSelector<AppRootStateType, Array<todolistsType>>(state => state.todolists)

    const dispatch = useDispatch()

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [dispatch])

    const updateTodolist = useCallback((todolistID: string, newTitle: string) => {
        dispatch(updateTodolistAC(todolistID, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID:string) => {
        dispatch(removeTodolistAC(todolistID))
    }, [dispatch])

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
                            return (
                                <Grid key={el.id} item>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist
                                            key={el.id}
                                            todolistID={el.id}
                                            title={el.title}
                                            changeFilter={changeFilter}
                                            removeTodolist={removeTodolist}
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

export default AppWithRedux;
