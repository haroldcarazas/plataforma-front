import { useQuery } from '@tanstack/react-query';
import { fetchVideos } from '../../api/fetchVideos';
import { Link } from 'react-router-dom';

function HomeVideos() {
  const { data } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
  });

  console.log(data);

  return (
    <main className='max-w-[950px] m-auto p-4'>
      <div className='flex justify-end'>
        <Link
          className='bg-green-400 rounded-md p-2 text-white'
          to='/videos/create'
        >
          Nuevo video
        </Link>
      </div>
      <section className='flex justify-center items-center gap-6 flex-wrap'>
        {data &&
          data.map(video => (
            <Link key={video._id} to={`/videos/${video._id}`}>
              <div className='p-2 border-slate-400 border-2 rounded-md w-[300px] h-[150px] flex justify-end flex-col cursor-pointer'>
                <p className='text-xl'>{video.titulo}</p>
                <p className='text-sm text-slate-400'>
                  {video.usuario.nombre} {video.usuario.apellidos}
                </p>
              </div>
            </Link>
          ))}
      </section>
    </main>
  );
}

export default HomeVideos;
