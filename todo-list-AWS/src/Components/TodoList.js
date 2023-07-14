import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const URL = 'https://vw8wztsy8d.execute-api.us-east-1.amazonaws.com/dev/items';

const TodoList = ({todos, setTodos, setEditTodo }) => {

  const handleDelete = ({id}) => {
    axios.delete(`https://vw8wztsy8d.execute-api.us-east-1.amazonaws.com/dev/items/${id}`)
    .then((Response) => {
      console.log(Response.data);
        axios.get(URL)
        .then((Response) => {
          console.log(Response.data.Items)
          setTodos(Response.data.Items);
        })
    })
  }

  const handleComplete = (item) => {
        axios.put(URL, 
        {
          id: item.id, title: item.title, completed: true
        }).then((Response) => {
          console.log(Response);
          axios.get(URL)
          .then((Response) => {
            console.log(Response.data.Items)
            setTodos(Response.data.Items);
          })
      })
  }

  const handleEdit = ({id}) =>  {
    const findTodo = todos.find((todo) => todo.id === id);
    setEditTodo(findTodo);
  }

  return (
    <div>
      {todos.map((todo) => (
          <li className='list-item' key={todo.id}>
            <input 
              type="text"
              value={todo.title}
              className= {`list ${todo.completed ? "complete" : ""}`}
              onChange={(event) => event.preventDefault()}
            />
            <div>
              <button className='button-complete task-button' onClick = {() => handleComplete(todo)}>
                <FontAwesomeIcon icon={faCircleCheck} />
              </button>

              <button className='button-edit task-button' onClick={() => handleEdit(todo)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button className='button-delete task-button' onClick = {() => handleDelete(todo)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </li>
      ))}
    </div>
  );
};

export default TodoList