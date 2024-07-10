import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import HomeVideos from './pages/videos/HomeVideos';
import Edit from './pages/videos/Edit';
import Detail from './pages/videos/Detail';
import Create from './pages/videos/Create';
import Dashboard from './pages/Dashboard';
import CursosDetail from './pages/maestro/CursosDetail';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/cursos/:id' element={<CursosDetail />} />
        <Route path='/videos' element={<HomeVideos />} />
        <Route path='/videos/:id' element={<Detail />} />
        <Route path='/videos/edit/:id' element={<Edit />} />
        <Route path='/videos/create' element={<Create />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
