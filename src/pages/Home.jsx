import { useMutation } from '@tanstack/react-query';
import { fetchLogin } from '../api/fetchAuth';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: fetchLogin,
    onSuccess: data => {
      const { token } = data;
      localStorage.setItem('tokenFunval', token);
      navigate('/dashboard');
    },
    onError: () => alert('Credenciales inválidas'),
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const { username, password } = e.target;
    const data = {
      username: username.value,
      password: password.value,
    };

    await loginMutation.mutateAsync(data);
  };
  return (
    <main className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-2xl text-center mb-5'>Login</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-5 bg-blue-300 p-5 rounded-md'
      >
        <label className='flex flex-col gap-1'>
          Usuario:{' '}
          <input
            className='border border-slate-400 rounded-sm'
            type='text'
            name='username'
          />
        </label>
        <label className='flex flex-col gap-2'>
          Contraseña:{' '}
          <input
            className='border border-slate-400 rounded-sm'
            type='text'
            name='password'
          />
        </label>
        <button
          type='submit'
          className='bg-blue-600 text-white py-1 rounded-sm'
        >
          Ingresar
        </button>
      </form>
    </main>
  );
}

export default Home;
