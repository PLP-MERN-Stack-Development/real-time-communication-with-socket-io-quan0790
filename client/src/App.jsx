import React, { useState } from "react";
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';


export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div>
      {token ? <Chat token={token} /> : <Login setToken={setToken} />}
    </div>
  );
}
