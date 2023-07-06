import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function Form({input, setInput, todos, setTodos, editTodo, setEditTodo}) {

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) => 
      todo.id === id ? {title, id, completed} : todo
    )
    setTodos(newTodo);
    setEditTodo("");
  }

  useEffect(() => {
    if(editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo])

  const onFormSubmit = (event) => {
    event.preventDefault();
    if(input !== '') {
      if(!editTodo) {
        setTodos([...todos, {id: uuidv4(), title: input, completed: false}])
        setInput("");
      } else {
        updateTodo(input, editTodo.id, editTodo.completed)
      }
    }
  }

  return (
    <div>
        <form onSubmit={onFormSubmit}>
            <input 
              type="text" 
              placeholder='Enter a todo ...' 
              className='task-input'
              value={input}
              onChange={onInputChange}
            />
            <button className='button-add' type='submit'>
              {editTodo? "OK" : "Add"}
            </button>
        </form>
    </div>
  )
}

export default Form