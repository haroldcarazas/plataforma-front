import axiosAPI from './axiosApi';

export const fetchVideos = async () => {
  const res = await axiosAPI.get('/api/videos');
  return res.data;
};

export const fetchVideoById = async(id) => {
  const res = await axiosAPI.get(`/api/videos/${id}`)
  return res.data
}

export const postVideo = async (data) => {
  const res = await axiosAPI.post('/api/videos', data)
  return res.data
}

export const deleteVideo = async (id) => {
  const res = await axiosAPI.delete(`/api/videos/${id}`)
  return res.data
}

export const updateVideo = async({id, data}) => {
  const res = await axiosAPI.put(`/api/videos/${id}`, data)
  return res.data
}