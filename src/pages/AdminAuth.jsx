import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "./firebase"; // твой Firebase setup

const auth = getAuth(app);
const db = getFirestore(app);

export default function AdminAuth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      
      if (userDoc.exists() && userDoc.data().role === "admin") {
        onLogin(); // Успешный вход для админа
      } else {
        setError("У вас нет прав администратора.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Вход для администратора</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Пароль" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Войти</button>
      {error && <p style={{color: "red"}}>{error}</p>}
    </div>
  );
}