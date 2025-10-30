import React, { useState } from 'react';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (url) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } else {
      alert("Login failed");
    }
  };

  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <h2>Login / Register</h2>
      <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} /><br />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br />
      <button onClick={() => login("http://localhost:5000/auth/login")}>Login</button>
      <button onClick={() => login("http://localhost:5000/auth/register")}>Register</button>
    </div>
  );
}
