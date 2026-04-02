import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Books from './pages/Books'
import Auth from './pages/Auth'
import Admin from './pages/Admin'
import AdminAuth from './pages/AdminAuth'
import { useState } from "react";
import AdminAuth from "./AdminAuth";
import AdminPanel from "./AdminPanel"; // твой админский интерфейс

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  if (!isAdmin) {
    return <AdminAuth onLogin={() => setIsAdmin(true)} />;
  }

  return <AdminPanel />;
}

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element ={<Books/>}/>
        <Route path='/auth' element ={<Auth/>}/>
        <Route path='/admin' element ={<Admin/>}/>
      </Routes>
    </>
  )
}

export default App
