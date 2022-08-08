import React, { useState, useEffect } from 'react';
import TodoEdit from './components/TodoEdit';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';
import axios from 'axios';

function App () {
  const [todos, setTodos] = useState([]);
  const [insertToggle, setInsertToggle] = useState(false);
  const [selectTodo, setSelectTodo] = useState(null);
  const [error, setError]= useState(null);
  const [isLoading, setIsLoading]= useState(true);
  //
  // const nextId = useRef(1);

  const onInsert = async (text) => {
    try{
      const data = await axios.post("http://localhost:4000/todos",{text});
      setTodos(data.data);
    } catch(e) {
      setError(e);
    }  
  };


  const onToggle = async (id) => {
    try{
      const data = await axios.patch(`http://localhost:4000/todos/abc/${id}`)
      setTodos(data.data)
    } catch(e) {
      setError(e);
    }
  };
 

  const onRemove = async (id) => {
      const data = await axios.delete(`http://localhost:4000/todos/${id}`) 
      setTodos(data.data)
  }

  const onInsertToggle = () => {
    setInsertToggle((prev)=> !prev)
  };


  const onUpdate = async (id, text) => {
    try {
      const data = await axios.patch(`http://localhost:4000/todos/${id}`, {text, perform_date: "2022-08-20 12:00:00"},)
    setTodos(data.data)
    onInsertToggle()
    } catch(e) {
      setError(e)
    }
  }
  
  useEffect(()=>{
    const getData = async () => {
      try {
        const data = await axios({
          url: "http://localhost:4000/todos",
          method: "get",
        });
        setTodos(todos => [...data.data]);
        setIsLoading(false);
      } catch(e) {
        setError(e);
    }
  }
  getData();
  }, []);
  
  if (error){
    console.log(error)
    return <>에러:{error.message}</>
  };

  if (isLoading){
    return <>Loading...</>
  };
  
    return (
    <>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} onInsertToggle={onInsertToggle} setSelectTodo={setSelectTodo}  />
        {insertToggle && (<TodoEdit onInsertToggle={onInsertToggle} selectTodo={selectTodo} onUpdate={onUpdate} />)}
      </TodoTemplate>
    </>
  );
};
export default App;