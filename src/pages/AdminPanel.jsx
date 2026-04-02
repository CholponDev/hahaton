import { useState } from "react";
import AdminAuth from "./AdminAuth";
import AdminPanel from "./AdminPanel"; // твой админский интерфейс

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  if (!isAdmin) {
    return <AdminAuth onLogin={() => setIsAdmin(true)} />;
  }

  return <AdminPanel />;
}

export default App;