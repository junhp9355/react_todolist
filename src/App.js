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
  const [error, setError]= useState(null)
  //
  // const nextId = useRef(1);
  // onInsert 함수로 새로 추가한 할일 리스트 등록(spl적용)
  // axios.(method)입력시 추가로 url, method, data 입력 필요 x
  const onInsert = async (text) => {
    try{
      const data = await axios.post("http://localhost:4000/todos",{text});
      setTodos(data.data);
    } catch(e) {
      setError(e);
    }  
  };

  ///// url 주소 때문에 오류 있었음, express 코드에서 check으로 설정되어 있었음
  const onToggle = async (id) => {
    try{
      const data = await axios.patch(`http://localhost:4000/todos/abc/${id}`)
      setTodos(data.data)
    } catch(e) {
      setError(e);
    }
  };
 
/// id값으로 제거 >>> url 뒤에 id값 추가
  const onRemove = async (id) => {
      const data = await axios.delete(`http://localhost:4000/todos/${id}`) 
      setTodos(data.data)
  }

  const onInsertToggle = () => {
    setInsertToggle((prev)=> !prev)
  };

  // const changeSelectTodo = todo => {
  //   setSelectTodo(selectTodo=>todo)
  // };

  /// 표현 방법 오류 발생으로 축약 못했음;;;;
  const onUpdate = async (id, text) => {
    try {
      await axios({url: `http://localhost:4000/todos/${id}`, method:"patch", data: {text, perform_date: "2022-08-20 12:00:00"},
    })
    setTodos(todos=> todos.map(todo=>(todo.id === id ? {...todo, text} : todo))
    )
    onInsertToggle()
    } catch(e) {
      setError(e)
    }
  }
  
  /// useEffect / getData 함수로 DB 적용
  useEffect(()=>{
    const getData = async () => {
      try {
        const data = await axios({
          url: "http://localhost:4000/todos",
          method: "get",
        });
        setTodos(todos => [...data.data]);
      } catch(e) {
        setError(e);
    }
  }
  getData();
  }, []);
  
  if (error){
    console.log(error)
    return <>에러:{error.message}</>
  }
  
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