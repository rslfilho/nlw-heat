import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://nlw-heat-rho.vercel.app/'
});
