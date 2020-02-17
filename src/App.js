import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar';
import User from './components/user/Users';
import axios from 'axios';
import Search from './components/user/Search';

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {

    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data, loading: false });
  }

  searchUsers = (text) => {
    console.log('text ', text);

  }

  render() {
    return (
      <div className="app">
        <Navbar title="Github Finder" />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <User loading={this.state.loading} users={this.state.users} />
        </div>

      </div>
    );
  }
}

export default App;
