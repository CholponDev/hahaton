import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header';
import Books from './pages/Books';
import Auth from './pages/Auth';
import AdminPanel from './pages/AdminPanel';
import AdminAuth from './pages/AdminAuth';
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const userDoc = await getDoc(doc(db, "users", u.uid));
        setIsAdmin(userDoc.exists() && userDoc.data().role === "admin");
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
        <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/auth" />} />
      </Routes>
    </>
  );
}

export default App;