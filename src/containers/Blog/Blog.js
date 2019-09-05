import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    seletedPostId: null,
    error: false,
  }

  componentDidMount() {
    axios.get('/posts')
      .then(response => {
        const posts = response.data.splice(0, 3);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Jack Yuan"
          }
        })
        this.setState( {posts: updatedPosts})
      })
      .catch(err => {
        this.setState({error: true})
      });
  }

  postSelectedHandler = (id) => {
    this.setState({seletedPostId: id});
  }

  render () {
    var posts = <p style={{textAlign: 'center'}}>Something went wrong...</p>
    if (!this.state.error) {
       posts = this.state.posts.map(post => {
        return <Post
          key={post.id}
          title = {post.title}
          author = {post.author}
          onClicked = {() => {this.postSelectedHandler(post.id)}}
        />
      })
    }


    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
          <section>
            <FullPost
              id = {this.state.seletedPostId}
              // title = {this.state.posts[this.state.seletedPostId].title}
              // author = {this.state.posts[this.state.seletedPostId].author}
            />
          </section>
          <section>
            <NewPost />
          </section>
      </div>
        );
    }
}

export default Blog;
