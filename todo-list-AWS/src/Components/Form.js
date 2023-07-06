import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function Form({input, setInput, todos, setTodos, editTodo, setEditTodo}) {

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const updateTodo = (title, id, completed) => {

    axios.put('https://1ube5zl184.execute-api.us-east-1.amazonaws.com/dev/items', 
    {
      id: id, title: title, completed: completed
    }).then((Response) => {
      console.log(Response);
      axios.get('https://1ube5zl184.execute-api.us-east-1.amazonaws.com/dev/items')
      .then((Response) => {
        console.log(Response.data.Items)
        setTodos(Response.data.Items);
      })
    });
    setInput("");
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
    if(!editTodo) {    
      axios.put('https://1ube5zl184.execute-api.us-east-1.amazonaws.com/dev/items', 
      {
        id: uuidv4(), title: input, completed: false
      }).then((Response) => {
        console.log(Response);
        axios.get('https://1ube5zl184.execute-api.us-east-1.amazonaws.com/dev/items')
        .then((Response) => {
          console.log(Response.data.Items)
          setTodos(Response.data.Items);
        })
      });
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed)
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