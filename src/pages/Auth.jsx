import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => alert("Регистрация успешна"))
      .catch(err => alert(err.message));
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => alert("Вход выполнен"))
      .catch(err => alert(err.message));
  };

  return (
    <div>
      <h2>Авторизация</h2>
      <input onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
      <input onChange={(e)=>setPassword(e.target.value)} placeholder="Пароль" />

      <button onClick={register}>Регистрация</button>
      <button onClick={login}>Войти</button>
    </div>
  );
}

export default Auth;