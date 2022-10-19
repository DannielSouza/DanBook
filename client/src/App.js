import './App.css';
import {BrowserRouter, Routes ,Route,} from "react-router-dom"
import Header from './components/Header';
import Home from './components/pages/Home'
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import { UserProvider } from './context/UserContext'
import Profile from './components/pages/Profile';
import EditProfile from './components/pages/EditProfile';
import PeopleProfile from './components/pages/PeopleProfile';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/profile/edit' element={<EditProfile />}/>
            <Route path='/profile/:id' element={<PeopleProfile />}/>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
