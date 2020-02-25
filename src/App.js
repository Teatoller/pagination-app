import React, { Component } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      posts: [],
      loading: false,
      activePage: "1",
      itemCountPerPage: "10"
    };
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
      const Posts = res.data;
      this.setState({
        posts: Posts,
        loading: false
      });
    });
  }

  render() {
    const { activePage, itemCountPerPage, loading, posts } = this.state;
    // Get current posts
    const indexOfLastItem = activePage * itemCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemCountPerPage;
    const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

    // Change page

    const paginate = pageNumber => {
      this.setState({
        activePage: pageNumber
      });
    };

    return (
      <div className="container mt-5">
        <h1 className="text-primary mb-3">My Blog</h1>
        <Posts posts={currentItems} loading={loading} />
        <Pagination
          itemCountPerPage={itemCountPerPage}
          totalItems={posts.length}
          paginate={paginate}
        />
      </div>
    );
  }
}

export default App;

