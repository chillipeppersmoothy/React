import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AxiosGet() {

    const[userData, setData] = useState([]);

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            setData(response.data)
        })
    },[])

    let getNames = (data)=>{
        return <p key={data.id}>{data.id}. {data.name}</p>
    }
    return (
        <h3>{userData.map(getNames)}</h3>
    )
}

export default AxiosGet;