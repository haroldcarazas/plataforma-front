import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import HomeVideos from './pages/videos/HomeVideos';
import Edit from './pages/videos/Edit';
import Detail from './pages/videos/Detail';
import Create from './pages/videos/Create';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/videos' element={<HomeVideos />} />
        <Route path='/videos/:id' element={<Detail />} />
        <Route path='/videos/edit/:id' element={<Edit />} />
        <Route path='/videos/create' element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
