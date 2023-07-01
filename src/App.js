import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import Home from './components/Home';
import Login from './components/Loginuser';
import Header from './components/Header';

function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/users' element={<UserList/>}/>
        <Route exact path='/users/:id' element={<UserDetails/>}/>
        <Route path='*' element={<h1>Not found 404 </h1>}/>
      </Routes>
    </>
  );
}

export default App;
