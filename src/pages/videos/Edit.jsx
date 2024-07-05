import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { fetchVideoById, updateVideo } from '../../api/fetchVideos';
import { fetchUsuarios } from '../../api/fetchUsuarios';
import { useNavigate, useParams } from 'react-router-dom';
import VideoRecorder from '../../components/VideoRecorder';

function Edit() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    mediaBlobUrl,
    status,
    previewStream,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  } = useReactMediaRecorder({
    video: true,
  });
  const videoMutation = useMutation({
    mutationFn: updateVideo,
    onSuccess: () => {
      alert('Video actualizado');
      navigate('/videos');
    },
    onError: () => alert('Hubo un error al actualizar el video'),
  });
  const { data: usuarios } = useQuery({
    queryKey: ['usuarios'],
    queryFn: fetchUsuarios,
  });
  const { data: videoActual, isLoading } = useQuery({
    queryKey: ['videoActual', id],
    queryFn: () => fetchVideoById(id),
  });

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  if (isLoading) {
    return <p>CARGANDO...</p>;
  }

  const putFormVideo = async e => {
    e.preventDefault();
    const resBlob = await fetch(mediaBlobUrl);
    const videoBlob = await resBlob.blob();

    const data = new FormData(e.target);
    data.append('video', videoBlob, 'video-ingles.mp4');
    await videoMutation.mutateAsync({ data, id: videoActual._id });
  };

  return (
    <main className='h-screen flex justify-center items-center'>
      <form
        className='w-[50%] border-2 border-slate-400 p-3 flex flex-col gap-5'
        onSubmit={putFormVideo}
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='titulo'>Título:</label>
          <input
            className='border border-slate-600 rounded-sm'
            type='text'
            name='titulo'
            defaultValue={videoActual.titulo}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='usaurio'>Usuario:</label>
          <select className='border border-slate-600 rounded-sm' name='usuario'>
            {usuarios &&
              usuarios.map(u => (
                <option key={u._id} value={u._id}>
                  {u.nombre} {u.apellidos}
                </option>
              ))}
          </select>
        </div>
        <VideoRecorder
          status={status}
          startRecording={startRecording}
          resumeRecording={resumeRecording}
          pauseRecording={pauseRecording}
          stopRecording={stopRecording}
          videoRef={videoRef}
          mediaBlobUrl={mediaBlobUrl}
        />
        <div className='flex justify-center items-center gap-4'>
          <button
            className='px-2 py-1 text-white bg-green-400 rounded-md'
            type='submit'
          >
            Guardar
          </button>
          <button
            className='px-2 py-1 text-white bg-red-400 rounded-md'
            onClick={() => navigate('/videos')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}

export default Edit;
