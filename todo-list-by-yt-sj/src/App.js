import './App.css';
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputItem = (event) => {
    event.preventDefault();
    if (input !== '') {
      if (!editTodo) {
        setTodos(() => {
          setTodos([...todos, {id: uuidv4(), title: input, completed: false}])
          setInput("");
        })
      } else {
        handleUpdateItem(editTodo.id, input, editTodo.completed);
      }
    }
  }

  function handleEditItem(id) {
    const findTodo = todos.find((item) => item.id === id)
    setEditTodo(findTodo);
  }

  function handleUpdateItem(id, title, completed) {
    const newTodo = todos.map((item) =>
      item.id === id ? { id, title, completed } : item
    )
    setTodos(newTodo);
    setEditTodo("");
  }

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [editTodo, setInput])


  function handleDeleteItem(id) {
    const newList = todos.filter((item) => {
      return item.id !== id;
    })
    setTodos(newList);
  }

  function handleCompleteItem(id) {
    setTodos(
      todos.map((item) => {
        if(item.id === id) {
          return {...item, completed: !item.completed};
        }
        return item;
      })
    )
  }

  return (
    <div>
      <div>
        <h1>ToDoList</h1>
      </div>
      <div>
        <form>
          <input type="text" placeholder='Add here...' value={input} onChange={(event) => { setInput(event.target.value) }} />
          <input type='submit' value='Add' onClick={handleInputItem} />
        </form>
      </div>
      <div>
        {todos !== [] && todos.map(
          (item) => {
            return (
              <div key={item.id}>
                <p>
                  {item.title}
                  <input type='submit' value='Completed' onClick={() => handleCompleteItem(item.id)} />
                  <input type='submit' value='Edit' onClick={() => handleEditItem(item.id)} />
                  <input type='submit' value='Delete' onClick={() => handleDeleteItem(item.id)} />
                </p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}


export default App;
