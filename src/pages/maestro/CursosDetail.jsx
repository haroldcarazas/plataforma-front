import { Link, useParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import { useQuery } from '@tanstack/react-query';
import { fetchById } from '../../api/fetchCursos';

function CursosDetail() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['curso', id],
    queryFn: () => fetchById(id),
  });

  console.log(data);

  return (
    <>
      <Nav />
      {isLoading ? (
        <div>Cargando datos del curso</div>
      ) : (
        <section className='w-[950px] m-auto p-2'>
          <h1 className='text-2xl text-center'>{data.nombre}</h1>
          {data.examenes.map(examen => (
            <Link
              key={examen._id}
              className='block h-[100px] w-[200px]'
              to={`/cursos/${id}/examen/${examen._id}`}
            >
              <div className='w-full h-full flex items-end p-3 bg-blue-200 rounded-md'>
                <p>{examen.nombre}</p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </>
  );
}

export default CursosDetail;
