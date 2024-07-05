import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { postVideo } from '../../api/fetchVideos';
import { fetchUsuarios } from '../../api/fetchUsuarios';
import { useNavigate } from 'react-router-dom';

function Create() {
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
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const videoMutation = useMutation({
    mutationFn: postVideo,
    onSuccess: () => {
      alert('Video creado');
      navigate('/videos');
    },
    onError: () => alert('Hubo un error al crear el video'),
  });
  const { data: usuarios } = useQuery({
    queryKey: ['usuarios'],
    queryFn: fetchUsuarios,
  });

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  const postFormVideo = async e => {
    e.preventDefault();
    const resBlob = await fetch(mediaBlobUrl);
    const videoBlob = await resBlob.blob();

    const data = new FormData(e.target);
    data.append('video', videoBlob, 'video-ingles.mp4');
    await videoMutation.mutateAsync(data);
  };

  return (
    <main className='h-screen flex justify-center items-center'>
      <form
        className='w-[50%] border-2 border-slate-400 p-3 flex flex-col gap-5'
        onSubmit={postFormVideo}
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='titulo'>Título:</label>
          <input
            className='border border-slate-600 rounded-sm'
            type='text'
            name='titulo'
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
        {status === 'stopped' && (
          <video
            src={mediaBlobUrl}
            className='h-[300px] w-full object-cover'
            controls
            autoPlay
          ></video>
        )}
        {(status === 'recording' || status === 'paused') && (
          <video
            ref={videoRef}
            className='h-[300px] w-full object-cover'
            controls
            autoPlay
          ></video>
        )}
        <div className='flex justify-center items-center gap-3'>
          {status === 'idle' && (
            <button
              type='button'
              className='bg-blue-400 rounded-md text-white px-2 py-1 w-full'
              onClick={startRecording}
            >
              Iniciar grabación
            </button>
          )}
          {status === 'stopped' && (
            <button
              type='button'
              className='bg-blue-400 rounded-md text-white px-2 py-1'
              onClick={startRecording}
            >
              Volver a grabar
            </button>
          )}
          {status === 'paused' && (
            <button
              type='button'
              className='bg-blue-400 rounded-md text-white px-2 py-1'
              onClick={resumeRecording}
            >
              Reaundar
            </button>
          )}
          {(status === 'recording' || status === 'paused') && (
            <>
              <button
                type='button'
                className='bg-orange-400 rounded-md text-white px-2 py-1'
                onClick={pauseRecording}
              >
                Pausar
              </button>
              <button
                type='button'
                className='bg-red-400 rounded-md text-white px-2 py-1'
                onClick={stopRecording}
              >
                Detener
              </button>
            </>
          )}
        </div>
        <div className='flex justify-center items-center gap-4'>
          <button
            className='px-2 py-1 text-white bg-green-400 rounded-md'
            type='submit'
          >
            Guardar
          </button>
          <button
            className='px-2 py-1 text-white bg-red-400 rounded-md'
            type='reset'
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}

export default Create;
