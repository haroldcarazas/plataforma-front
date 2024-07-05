import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteVideo, fetchVideoById } from '../../api/fetchVideos';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery({
    queryKey: ['video', id],
    queryFn: () => fetchVideoById(id),
  });
  const deleteVideoMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      alert('Video eliminado');
      navigate('/videos');
    },
    onError: () => alert('Error al eliminar el video'),
  });

  if (isError) {
    navigate('/videos');
  }

  if (isLoading) {
    return <p>CARGANDO...</p>;
  }

  const handleDeleteVideo = async () => {
    const respuesta = confirm('¿Deseas eliminar el video?');
    if (!respuesta) return;

    await deleteVideoMutation.mutateAsync(data._id);
  };
  return (
    <main className='max-w-[950px] m-auto p-4'>
      <Link
        to='/videos'
        className='absolute top-3 left-3 bg-blue-200 rounded-md px-2 py-1'
      >
        Regresar
      </Link>
      <section className='mb-5'>
        <video
          src={`http://localhost:3000/api/videos/content/${data._id}`}
          controls
          className='w-[80%] h-[400px] m-auto rounded-md object-cover'
        ></video>
      </section>
      <section className='mb-5'>
        <p className='text-2xl'>Título: {data.titulo}</p>
        <p className='text-md text-slate-400'>
          Usuario: {data.usuario.nombre} {data.usuario.apellidos}
        </p>
      </section>
      <section className='flex justify-end items-center gap-4'>
        <button className='px-3 py-2 rounded-md text-white bg-blue-400'>
          Editar
        </button>
        <button
          className='px-3 py-2 rounded-md text-white bg-red-400'
          onClick={handleDeleteVideo}
        >
          Eliminar
        </button>
      </section>
    </main>
  );
}

export default Detail;
