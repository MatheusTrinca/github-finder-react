import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import github from './api/github';
import SearchUsers from './components/users/SearchUsers';

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  onSearch = async (text) => {
    this.setState({ loading: true });
    const response = await github.get(`/search/users?q=${text}`);
    this.setState({ users: response.data.items });
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <SearchUsers onSearch={this.onSearch} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
