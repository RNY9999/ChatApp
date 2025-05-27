import axiosBase from 'axios';

const axios = axiosBase.create({
  baseURL: process.env.NEXT_PUBLIC_DEV_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-Width': 'XMLHttpRequest',
  },
  responseType: 'json',
});

export default axios;