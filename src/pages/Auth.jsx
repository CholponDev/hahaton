import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

export default function Auth() {
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
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Авторизация</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={register} style={{ width: "100%", marginBottom: "5px" }}>Регистрация</button>
      <button onClick={login} style={{ width: "100%" }}>Войти</button>
    </div>
  );
}