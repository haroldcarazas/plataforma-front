import axiosAPI from './axiosApi';

export const fetchLogin = async data => {
  const res = await axiosAPI.post('/api/auth/login', data);
  return res.data;
};

export const fetchMe = async token => {
  const res = await axiosAPI.get('/api/auth/me', {
    headers: { Authorization: token },
  });
  return res.data;
};
