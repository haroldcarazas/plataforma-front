import { useQuery } from '@tanstack/react-query';
import { userStore } from '../../services/userStore';
import { fetchCursosByUsuarioId } from '../../api/fetchCursos';
import { Link } from 'react-router-dom';

function Cursos() {
  const user = userStore(state => state.user);
  const { data, isLoading } = useQuery({
    queryKey: ['cursos', user._id],
    queryFn: () => fetchCursosByUsuarioId(user._id),
  });

  if (isLoading) {
    return <div>Cargando cursos...</div>;
  }

  return (
    <section className='w-[950px] m-auto flex justify-center items-center flex-wrap gap-5 p-4'>
      {data.map(curso => (
        <Link
          key={curso._id}
          className='block h-[100px] w-[200px]'
          to={`/cursos/${curso._id}`}
        >
          <div className='w-full h-full flex items-end p-3 bg-blue-200 rounded-md'>
            <p>{curso.nombre}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default Cursos;
