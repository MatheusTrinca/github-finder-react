import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchUsers extends Component {
  state = {
    text: '',
  };

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            value={this.state.text}
            onChange={this.onChange}
            type="text"
            name="text"
            placeholder="Search Users..."
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showClear && (
          <button onClick={clearUsers} className="btn btn-light btn-block">
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default SearchUsers;
