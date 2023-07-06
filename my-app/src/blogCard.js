import React, { Component } from 'react';
import classes from './blogCard.module.css'

class BlogCard extends Component {
    state={
        likeCount: 0
    }

    increaseLike = () => {
        this.setState((prevState, prevProps) => {
            return {likeCount: prevState.likeCount+1}
        })
    }

    render() {
        return (
            <div className={classes.blogdiv} key={this.props.id}>
                <h3>{this.props.title}</h3>
                <p>{this.props.body}</p>
                <p>Like count: <span>{this.state.likeCount}</span></p>
                <button className={classes.btnClass} onClick={this.increaseLike}> Like </button>
            </div>
        )
    }
}

export default BlogCard;