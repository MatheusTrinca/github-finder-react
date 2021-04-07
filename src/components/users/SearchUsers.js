import React, { useState, useContext } from 'react';
import GithubContext from '../../contexts/github/githubContext';
import AlertContext from '../../contexts/alert/alertContext';

const SearchUsers = () => {
  const [text, setText] = useState('');

  const githubContext = useContext(GithubContext);
  const { onSearch, users, clearUsers } = githubContext;
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      showAlert(' Please insert something', 'light');
    } else {
      onSearch(text);
      setText('');
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
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
      {users.length > 0 && (
        <button onClick={clearUsers} className="btn btn-light btn-block">
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchUsers;
