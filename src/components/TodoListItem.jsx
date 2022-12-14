import React from 'react';
import cn from "classnames";
import "../styles/TodoListItem.scss";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdModeEditOutline, MdRemoveCircleOutline } from 'react-icons/md';




const TodoListItem = ({todo, onRemove, onInsertToggle, onToggle, setSelectTodo, handleDragStart, handleDragOver, handleDrop }) => {
    const { id, text, checked} = todo;
////

///



    return (
        <li className='TodoListItem' draggable={true} onDragStart={(e) => {handleDragStart(e, todo)}} onDragOver={handleDragOver} onDrop={(e)=> {handleDrop(e, todo)}} >
                <div className={cn("checkbox", {checked: checked})} onClick={()=> {onToggle(id)}} >
                    {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                    <div className='text'>{text}</div>
                </div>
                <div className='edit'
                    onClick={()=> {
                        setSelectTodo(todo);
                        onInsertToggle()
                    }}
                    >
                    <MdModeEditOutline />
                </div>
                <div className='remove' onClick={()=>{
                    onRemove(id);
                }}>
                <MdRemoveCircleOutline />
                </div>
        </li>
    );
};

export default TodoListItem;