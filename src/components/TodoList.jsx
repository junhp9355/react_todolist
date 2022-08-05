import React from 'react';
import "../styles/TodoList.scss";
import TodoListItem from "./TodoListItem"

const TodoList = ({todos, onRemove, onToggle, onInsertToggle, setSelectTodo, selectTodo, changeSelectTodo}) => {
    return (
        <ul className='TodoList'>
            {todos.map((todo, index)=>(<TodoListItem todo={todo} key={index} onRemove={onRemove} onToggle={onToggle} onInsertToggle={onInsertToggle} setSelectTodo={setSelectTodo} changeSelectTodo={changeSelectTodo} />))}
        </ul>
    );
};

export default TodoList;