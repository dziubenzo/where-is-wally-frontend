const API_URL = import.meta.env.DEV
  ? 'http://192.168.0.13:3000'
  : 'https://where-is-wally-backend.fly.dev';

export default API_URL;
