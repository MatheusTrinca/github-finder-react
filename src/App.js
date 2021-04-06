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
    this.setState({ users: response.data.items, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [] });
  };

  render() {
    const { users, loading } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <SearchUsers
            showClear={users.length > 0 ? true : false}
            clearUsers={this.clearUsers}
            onSearch={this.onSearch}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
