import './App.css';
import {BrowserRouter, Routes ,Route,} from "react-router-dom"
import Header from './components/Header';
import Home from './components/pages/Home'
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
