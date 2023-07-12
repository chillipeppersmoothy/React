import './App.css';
import Header from './Components/Header';
import Form from './Components/Form';
import { useState, useEffect } from 'react';
import TodoList from './Components/TodoList';
import axios from 'axios';

const URL = 'https://sf0xguv28e.execute-api.us-east-1.amazonaws.com/dev/items';

const App = () => {

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  
  useEffect(() => {
    axios.get(URL)
    .then((Response) => {
      console.log(Response.data.Items)
      setTodos(Response.data.Items);
    })
  }, [setTodos])

  return (
    <div className="container">
      <header className="app-wrapper">
        <div>
          <Header />
        </div>
        <div>
          <Form 
            input = {input}
            setInput = {setInput}
            todos = {todos}
            setTodos = {setTodos}
            editTodo = {editTodo}
            setEditTodo = {setEditTodo}
          />
        </div>
        <div>
          <TodoList 
            todos={todos} 
            setTodos={setTodos} 
            setEditTodo={setEditTodo} />
        </div>
      </header>
    </div>
  );
}

export default App;
