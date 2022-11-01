import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type PropsType = {
    title: string
    callback: (newTitle: string) => void;
}


const EditableSpan = React.memo((props: PropsType) => {

    console.log("EditableSpan")
    const {title, callback} = props

    const [toggle, setToggle] = useState(false);
    let [newTitle, setNewTitle] = useState(title)


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
            setToggle(!toggle)
        }
    }

    const addTask = () => {
        if (newTitle.trim() !== "") {
            callback(newTitle);
        }
    }

    const onToggleHandler = () => {
        setToggle(!toggle);
        addTask()
    }

    return (
        toggle ? <input onChange={onChangeHandler} onKeyPress={onKeyPressHandler} onBlur={onToggleHandler} autoFocus
                        value={newTitle}/> : <span onDoubleClick={onToggleHandler}>{title}</span>
    );
});

export default EditableSpan;