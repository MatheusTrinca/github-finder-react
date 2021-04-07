import { useReducer } from 'react';
import github from '../../api/github';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
  CLEAR_USERS,
} from '../types';

const GithubState = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const onSearch = async (text) => {
    setLoading();
    const response = await github.get(`/search/users?q=${text}`);
    dispatch({ type: SEARCH_USERS, payload: response.data.items });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const getUser = async (username) => {
    setLoading();
    const response = await github.get(`/users/${username}`);
    dispatch({ type: GET_USER, payload: response.data });
  };

  const getUserRepos = async (username) => {
    setLoading();
    const response = await github.get(
      `/users/${username}/repos?per_page=5&sort=created:asc`
    );
    dispatch({ type: GET_REPOS, payload: response.data });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        onSearch,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubState;
