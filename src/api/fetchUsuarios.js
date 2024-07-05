import axiosAPI from './axiosApi';

export const fetchUsuarios = async () => {
  const res = await axiosAPI.get('/api/usuarios');
  return res.data;
};