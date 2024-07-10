import { userStore } from '../services/userStore';

function Nav() {
  const usuario = userStore(state => state.usuario);
  return (
    <nav className='h-[50px] flex justify-end items-center p-5 bg-blue-500 text-white'>
      <span>Bienvenido {usuario?.nombre}</span>
    </nav>
  );
}

export default Nav;
