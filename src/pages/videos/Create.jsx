import { useEffect, useRef } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

function Create() {
  const { previewStream, startRecording, stopRecording } =
    useReactMediaRecorder({
      video: true,
    });
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && previewStream) {
      console.log(videoRef);
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  return (
    <main className='h-screen flex justify-center items-center'>
      <form className='w-[50%] border-2 border-slate-400 p-3 flex flex-col gap-5'>
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
            <option value=''>Usuario 1</option>
            <option value=''>Usuario 2</option>
          </select>
        </div>
        <video ref={videoRef} className='h-[300px]' controls autoPlay></video>
        <div className='flex justify-center items-center gap-3'>
          <button
            type='button'
            className='bg-blue-400 rounded-md text-white px-2 py-1'
            onClick={startRecording}
          >
            Iniciar grabación
          </button>
          <button
            type='button'
            className='bg-red-400 rounded-md text-white px-2 py-1'
            onClick={stopRecording}
          >
            Detener grabación
          </button>
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
