import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { book } from "./data";

function Books() {
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "books"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(data);
    });

    return () => unsubscribe(); // важно
  }, []);

  const deleteBook = async (id) => {
    await deleteDoc(doc(db, "books", id));
  };

  const startEdit = (book) => {
    setEditId(book.id);
    setNewTitle(book.title);
    setNewAuthor(book.author);
  };

  const saveEdit = async (id) => {
    await updateDoc(doc(db, "books", id), {
      title: newTitle,
      author: newAuthor
    });
    setEditId(null);
  };

  return (
    <div>
      <h2>Список книг</h2>

      {books.length === 0 && <p>Книг пока нет</p>}

      {books.map(book => (
        <div key={book.id}>
          {editId === book.id ? (
            <>
              <input value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} />
              <input value={newAuthor} onChange={(e)=>setNewAuthor(e.target.value)} />
              <button onClick={() => saveEdit(book.id)}>Сохранить</button>
            </>
          ) : (
            <>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <button onClick={() => startEdit(book)}>Редактировать</button>
              <button onClick={() => deleteBook(book.id)}>Удалить</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Books;