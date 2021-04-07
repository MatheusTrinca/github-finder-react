import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import github from './api/github';
import SearchUsers from './components/users/SearchUsers';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  onSearch = async (text) => {
    this.setState({ loading: true });
    const response = await github.get(`/search/users?q=${text}`);
    this.setState({ users: response.data.items, loading: false });
  };

  getUser = async (username) => {
    this.setState({ loading: true });
    const response = await github.get(`/users/${username}`);
    this.setState({ user: response.data, loading: false });
  };

  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const response = await github.get(
      `/users/${username}/repos?per_page=5&sort=created:asc`
    );
    this.setState({ repos: response.data, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [] });
  };

  showAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { alert, users, user, loading, repos } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <SearchUsers
                      showClear={users.length > 0 ? true : false}
                      clearUsers={this.clearUsers}
                      onSearch={this.onSearch}
                      showAlert={this.showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/users/:login"
                render={(props) => (
                  <User
                    {...props}
                    user={user}
                    repos={repos}
                    loading={loading}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
