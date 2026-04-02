import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import Header from './components/Header';
import Books from './pages/Books';
import Auth from './pages/Auth';
import AdminAuth from './pages/AdminAuth';
import AdminPanel from './pages/AdminPanel';
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);      // текущий пользователь
  const [isAdmin, setIsAdmin] = useState(false); // флаг админа
  const [loading, setLoading] = useState(true); // пока проверяем роль

  // Проверка авторизации и роли админа
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const userDoc = await getDoc(doc(db, "users", u.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Загрузка...</p>;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/auth" element={<Auth />} />

        {/* Защищённый админский роут */}
        <Route
          path="/admin"
          element={isAdmin ? <AdminPanel /> : <Navigate to="/auth" />}
        />

        {/* Любой другой роут можно редиректить */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;