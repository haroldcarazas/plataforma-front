import axios from 'axios';
import { useEffect, useState } from 'react';

function HomeVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/videos')
      .then(res => setVideos(res.data))
      .catch(err => console.log(err));
  }, []);

  console.log(videos);

  return <div>HomeVideos</div>;
}

export default HomeVideos;
