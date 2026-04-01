import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Admin() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addBook = async () => {
    await addDoc(collection(db, "books"), {
      title,
      author
    });
    alert("Книга добавлена");
  };

  return (
    <div>
      <h2>Админ панель</h2>

      <input onChange={(e)=>setTitle(e.target.value)} placeholder="Название книги" />
      <input onChange={(e)=>setAuthor(e.target.value)} placeholder="Автор" />

      <button onClick={addBook}>Добавить книгу</button>
    </div>
  );
}

export default Admin;