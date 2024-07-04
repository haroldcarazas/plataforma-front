import axiosAPI from './axiosApi';

export const fetchVideos = async () => {
  const res = await axiosAPI.get('/api/videos');
  return res.data;
};

export const fetchVideoById = async(id) => {
  const res = await axiosAPI.get(`/api/videos/${id}`)
  return res.data
}