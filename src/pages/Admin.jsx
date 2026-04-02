import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Admin() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addBook = async () => {
    if (!title || !author) {
      alert("Заполни все поля");
      return;
    }

    try {
      await addDoc(collection(db, "books"), { title, author });
      setTitle("");
      setAuthor("");
      alert("Книга добавлена!");
    } catch (err) {
      alert("Ошибка при добавлении книги: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Админ панель</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название книги"
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Автор"
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={addBook} style={{ width: "100%" }}>Добавить книгу</button>
    </div>
  );
}

export default Admin;