import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.github.com',
  params: {
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
    secret_id: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
  },
});
