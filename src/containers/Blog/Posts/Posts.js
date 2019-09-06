import React, {Component} from 'react';
import axios from "../../../axios";
import Post from '../../../components/Post/Post';

import './Posts.css';
import {Link} from "react-router-dom";

class Posts extends Component{
  state = {
    posts: [],
    // seletedPostId: null,
    // error: false,
  };

  componentDidMount() {
    // console.log('this.props:');
    // console.log(this.props);
    axios.get('/posts')
      .then(response => {
        const posts = response.data.splice(0, 3);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Jack Yuan"
          }
        })
        // console.log(updatedPosts);
        this.setState( {posts: updatedPosts})
      })
      .catch(err => {
        this.setState({error: true})
      });
  }

  postSelectedHandler = (id) => {
    this.setState({seletedPostId: id});
  }

  render() {
    var posts = <p style={{textAlign: 'center'}}>Something went wrong...</p>
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Link to={'/' + post.id} key={post.id}>
            <Post
              title = {post.title}
              author = {post.author}
              onClicked = {() => {this.postSelectedHandler(post.id)}}
            />
          </Link>
        )
      })
    }
    return (
      <section className="Posts">
        {posts}
      </section>
    )
  }
}

export default Posts;
