import React, { Component } from 'react';

class SearchUsers extends Component {
  state = {
    text: '',
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.text);
  };

  render() {
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
      </div>
    );
  }
}

export default SearchUsers;
