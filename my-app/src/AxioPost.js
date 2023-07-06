import React, { useState } from 'react'
import classes from './Axios.module.css';
import axios from 'axios'

function AxioPost() {

    const data = {fname: "", lname: ""};
    const [inputData, setInputData] = useState(data);

    const changeData = (event) => {
        setInputData({...inputData,[event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://jsonplaceholder.typicode.com/users', inputData)
        .then((response) => {
            console.log(response)
        }).then(() => {
            alert('Data Submitted Successfully')
        })
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.patch('https://jsonplaceholder.typicode.com/users/11', inputData)
        .then((response) => {
            console.log(response)
        }).then(() => {
            alert('Data Updated Successfully')
        })
    }

    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete('https://jsonplaceholder.typicode.com/users/1')
        .then((response) => {
            console.log(response)
        }).then(() => {
            alert('Data Deleted Successfully')
        })
    }

  return (
    <form>
        <label>Firstname: </label>
        <input className={classes.inputbox} type="text" name="fname" value={inputData.fname} onChange={changeData}></input>
        <br/>
        <label>Lastname: </label>
        <input className={classes.inputbox} type="text" name="lname" value={inputData.lname} onChange={changeData}></input>
        <br/>
        <button className={classes.inputbox} onClick={handleSubmit}>Submit</button>
        <button className={classes.inputbox} onClick={handleUpdate}>Update</button>
        <button className={classes.inputbox} onClick={handleDelete}>Delete</button>
    </form>
  )
}

export default AxioPost