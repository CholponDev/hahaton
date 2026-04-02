import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function AdminPanel() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "books"), snapshot => {
      setBooks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const addBook = async () => {
    if (!title || !author) return alert("Заполните поля");
    await addDoc(collection(db, "books"), { title, author });
    setTitle(""); setAuthor("");
  };

  const deleteBook = async (id) => await deleteDoc(doc(db, "books", id));

  const startEdit = (book) => {
    setEditId(book.id);
    setNewTitle(book.title);
    setNewAuthor(book.author);
  };

  const saveEdit = async (id) => {
    await updateDoc(doc(db, "books", id), { title: newTitle, author: newAuthor });
    setEditId(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Админ панель</h2>

      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Название книги" />
      <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Автор" />
      <button onClick={addBook}>Добавить книгу</button>

      <hr />

      {books.map(book => (
        <div key={book.id} style={{ marginBottom: 10 }}>
          {editId === book.id ? (
            <>
              <input value={newTitle} onChange={e=>setNewTitle(e.target.value)} />
              <input value={newAuthor} onChange={e=>setNewAuthor(e.target.value)} />
              <button onClick={()=>saveEdit(book.id)}>Сохранить</button>
            </>
          ) : (
            <>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <button onClick={()=>startEdit(book)}>Редактировать</button>
              <button onClick={()=>deleteBook(book.id)}>Удалить</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}