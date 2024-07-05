/* eslint-disable react/prop-types */
function VideoRecorder({
  mediaBlobUrl,
  videoRef,
  startRecording,
  resumeRecording,
  stopRecording,
  pauseRecording,
  status,
}) {
  return (
    <>
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
    </>
  );
}

export default VideoRecorder;
