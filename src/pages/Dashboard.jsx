import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '../api/fetchAuth';
import Cursos from './maestro/Cursos';
import Examenes from './alumno/Examenes';
import { userStore } from '../services/userStore';
import Nav from '../components/Nav';

function Dashboard() {
  const token = localStorage.getItem('tokenFunval');
  const updateUser = userStore(state => state.updateUser);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['usuario', token],
    queryFn: () => fetchMe(token),
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isError && data) {
    updateUser(data);
  }

  return (
    <>
      <Nav />
      <main>{data && data.rol === 'maestro' ? <Cursos /> : <Examenes />}</main>
    </>
  );
}

export default Dashboard;
