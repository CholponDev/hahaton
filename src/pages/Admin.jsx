import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Admin() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addBook = async () => {
    if (!title || !author) {
      alert("Заполни поля");
      return;
    }

    await addDoc(collection(db, "books"), {
      title,
      author
    });

    setTitle("");
    setAuthor("");
  };

  return (
    <div>
      <h2>Админ панель</h2>

      <input 
        value={title}
        onChange={(e)=>setTitle(e.target.value)} 
        placeholder="Название книги" 
      />
      
      <input 
        value={author}
        onChange={(e)=>setAuthor(e.target.value)} 
        placeholder="Автор" 
      />

      <button onClick={addBook}>Добавить книгу</button>
    </div>
  );
}

export default Admin;