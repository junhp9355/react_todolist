import React from 'react';

import "../styles/TodoList.scss";
import TodoListItem from "./TodoListItem"

const TodoList = ({todos, onRemove, onToggle, onInsertToggle, setSelectTodo, selectTodo, changeSelectTodo,setTodos, setTodo, handleDragStart, handleDragOver, handleDrop }) => {
    return (
        <ul className='TodoList'>

            {todos.map((todo, index)=>(<TodoListItem todo={todo} key={index} onRemove={onRemove} onToggle={onToggle} onInsertToggle={onInsertToggle}
            setSelectTodo={setSelectTodo} changeSelectTodo={changeSelectTodo} setTodos={setTodos} setTodo={setTodo}
            handleDragStart={handleDragStart} handleDragOver={handleDragOver} handleDrop={handleDrop} />))}

        </ul>
    );
};

export default TodoList;
