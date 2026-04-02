import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';

import Header from './components/Header';
import Books from './pages/Books';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import AdminAuth from './pages/AdminAuth';
import AdminPanel from './pages/AdminPanel'; // твой интерфейс админа

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Если админ ещё не вошёл — показываем форму входа для админа
  if (!isAdmin) return <AdminAuth onLogin={() => setIsAdmin(true)} />;

  // Когда админ вошёл — основной интерфейс с роутами
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {/* Или если хочешь показывать админский интерфейс сразу: */}
      <AdminPanel />
    </>
  );
}

export default App;