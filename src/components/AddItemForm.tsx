import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";
import styled from "styled-components";


type PropsType = {
    addItem: (title: string) => void;
}

const AddItemForm = React.memo((props: PropsType) => {
    console.log('AddItemForm')
    const {addItem} = props

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const addTask = () => {
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(false);
        }
        if (e.charCode === 13) {
            addTask();
        }
    }


    return (
        <div>
            <TextField id="outlined-basic" label={error ? "Title is required" : ""} variant="outlined" size="small" value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={error}/>
            <StyleForButton variant="contained" size={"small"} onClick={addTask}>+</StyleForButton>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
});

export default AddItemForm;


const StyleForButton = styled(Button)`
  max-width: 40px;
  max-height: 40px;
  min-width: 40px !important;
  min-height: 40px;
`
