import React, {Component} from 'react';
import axios from "../../../axios";
import Post from '../../../components/Post/Post';

import './Posts.css';
import {Link, Route} from "react-router-dom";
import FullPost from "../FullPost/FullPost";

class Posts extends Component{
  state = {
    posts: [],
    // seletedPostId: null,
    // error: false,
  };

  componentDidMount() {
    // console.log('Posts this.props:');
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
    // this.props.history.push({pathname: '/' + id});
    this.props.history.push('/posts/' + id);
  }

  render() {
    var posts = <p style={{textAlign: 'center'}}>Something went wrong...</p>
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
         // {/*<Link to={'/' + post.id} key={post.id}>*/}
            <Post key={post.id}
              title = {post.title}
              author = {post.author}
              onClicked = {() => {this.postSelectedHandler(post.id)}}
            />
          // </Link>
        )
      })
    }
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path={this.props.match.url + '/:postId'} exact component={FullPost} />

      </div>
    )
  }
}

export default Posts;
