import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { Home } from './components/Home/Home';


function App() {
  <Routes>
    <Route path="/" element={<><Navbar /><Outlet /></>}>
      <Route index element={<Home />} />



    </Route>
  </Routes>
}

export default App;
