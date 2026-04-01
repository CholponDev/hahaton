import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";

const deleteBook = async (id) => {
  await deleteDoc(doc(db, "books", id));
};

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const querySnapshot = await getDocs(collection(db, "books"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(data);
    };

    getBooks();
  }, []);

  return (
    <div>
      <h2>Список книг</h2>

      {books.map(book => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p> 
          <button onClick={() => deleteBook(book.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}

export default Books;