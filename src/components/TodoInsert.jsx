import React, { useState } from 'react';
import {MdAdd} from "react-icons/md"
import "../styles/TodoInsert.scss"

const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState("");
    const onChange = (e) => {
        setValue(e.target.value)
    };
    const onSubmit = (e) => {
        e.preventDefault();
        onInsert(value);
        setValue("");
    }
    return (
        <form className='TodoInsert' onSubmit={onSubmit}>
            <input placeholder='할 일을 입력하세요' value={value} onChange={onChange} />
            <button type='submit'><MdAdd /></button>
        </form>
    );
};

export default TodoInsert;
