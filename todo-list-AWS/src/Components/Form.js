import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const URL = 'https://vw8wztsy8d.execute-api.us-east-1.amazonaws.com/dev/items';

function Form({input, setInput, todos, setTodos, editTodo, setEditTodo}) {

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const updateTodo = (title, id, completed) => {

    axios.put(URL, 
    {
      id: id, title: title, completed: completed
    }).then((Response) => {
      console.log(Response);
      axios.get(URL)
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
      axios.put(URL, 
      {
        id: uuidv4(), title: input, completed: false
      }).then((Response) => {
        console.log(Response);
        axios.get(URL)
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