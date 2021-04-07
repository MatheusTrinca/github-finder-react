import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import github from './api/github';
import SearchUsers from './components/users/SearchUsers';
import Alert from './components/layout/Alert';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  onSearch = async (text) => {
    this.setState({ loading: true });
    const response = await github.get(`/search/users?q=${text}`);
    this.setState({ users: response.data.items, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [] });
  };

  showAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { alert, users, loading } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <SearchUsers
            showClear={users.length > 0 ? true : false}
            clearUsers={this.clearUsers}
            onSearch={this.onSearch}
            showAlert={this.showAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
