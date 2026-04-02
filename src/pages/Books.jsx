import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";

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

    return () => unsubscribe();
  }, []);

  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, "books", id));
    } catch (err) {
      alert("Ошибка при удалении книги: " + err.message);
    }
  };

  const startEdit = (book) => {
    setEditId(book.id);
    setNewTitle(book.title);
    setNewAuthor(book.author);
  };

  const saveEdit = async (id) => {
    try {
      await updateDoc(doc(db, "books", id), {
        title: newTitle,
        author: newAuthor
      });
      setEditId(null);
    } catch (err) {
      alert("Ошибка при сохранении: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Список книг</h2>
      {books.length === 0 && <p>Книг пока нет</p>}

      {books.map(book => (
        <div key={book.id} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
          {editId === book.id ? (
            <>
              <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              <input value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} />
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