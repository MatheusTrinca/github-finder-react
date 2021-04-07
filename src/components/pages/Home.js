import React, { Fragment } from 'react';
import SearchUsers from '../users/SearchUsers';
import Users from '../users/Users';

const Home = () => {
  return (
    <Fragment>
      <SearchUsers />
      <Users />
    </Fragment>
  );
};

export default Home;
