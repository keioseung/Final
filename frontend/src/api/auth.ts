import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// 토큰 자동 첨부
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function login(username: string, password: string) {
  const res = await API.post('/auth/login', { username, password });
  localStorage.setItem('token', res.data.access_token);
  return res.data;
}

export function logout() {
  localStorage.removeItem('token');
}

export async function getMe() {
  const res = await API.get('/auth/me');
  return res.data;
} 