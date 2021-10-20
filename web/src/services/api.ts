import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://nlw-node.herokuapp.com/'
});
