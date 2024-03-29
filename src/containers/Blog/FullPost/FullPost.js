import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  }

  componentDidMount() {
    console.log('FullPost this.props:');
    console.log(this.props);
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.loadData();
  }

  loadData () {
    if (this.props.match.params.postId) {
      //this.props.match.params.postId is a string so below we have to use != instead of !===
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !==  +this.props.match.params.postId))
      {
      axios.get('/posts/' + this.props.match.params.postId)
        .then(res => {
         this.setState({loadedPost: res.data});
          console.log(res)
        });
      };
    };
  }
  deletePostHandler = () => {
    axios.delete('/posts/' + this.props.match.params.postId)
      .then(res => {
        console.log(res);
      });
  }

  render () {
    let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
      if (this.props.match.params.postId) {
        post = <p style={{textAlign: 'center'}}>Loading</p>;
      }
    if (this.state.loadedPost) {
        post = (
          <div className="FullPost">
            <h1>{this.state.loadedPost.title}</h1>
            <p>{this.state.loadedPost.body}</p>
            <div className="Edit">
              <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
            </div>
          </div>

        );
      }
      return post;
  }
}

export default FullPost;
