import logo from './logo.svg';
import React, {Component} from 'react'
import './App.css';
import BlogCard from './blogCard';
import {dumpLogs, isArrayEmpty} from './utils'
import AxiosGet from './AxiosGet';
import AxioPost from './AxioPost';

class App extends Component {

  state = {
    showBlogs: true,
  }
  
  // const firstName ='John';
  // const lastName = 'Lark'
  // const age = 33;
  // const job = 'spy'

  // const getFullName = (firstName,lastName) => `${firstName} ${lastName}` 
  blog = [
    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
      "userId": 1,
      "id": 3,
      "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }
  ];

  blogCards =  isArrayEmpty(this.blog)? []: this.blog.map((data,pos)=> {
    dumpLogs(data);
    return (
      <BlogCard title={data.title} body={data.body} id={pos}/>
    )
  })

  hideList = () => {
    //this.setState({showBlogs: false})
    //let updatedState = !this.state.showBlogs;
    this.setState((prevState, prevProps) => {
      this.setState({showBlogs: !prevState.showBlogs})
    }) 
    console.log(this.state.showBlogs)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button className='btnClass' onClick={this.hideList}>{this.state.showBlogs===true?'Hide List': 'Show List'}</button>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {/* <div className='divclass'>
            <h3>{getFullName(firstName,lastName)}</h3>
            <p>{age}</p>
            <p>{job}</p>
          </div> */}
          
          {this.state.showBlogs? this.blogCards: null}
          <AxioPost />
          <AxiosGet />
          
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
