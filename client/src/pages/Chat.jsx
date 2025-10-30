import React, { useEffect, useState } from "react";
import { connectSocket, getSocket } from "../socket";


export default function Chat({ token }) {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    const s = connectSocket(token);

    s.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    s.on("user:joined", (user) => {
      setMessages((prev) => [...prev, { system: true, text: `${user} joined` }]);
    });

    s.on("user:left", (user) => {
      setMessages((prev) => [...prev, { system: true, text: `${user} left` }]);
    });

    s.on("typing", (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(""), 1500);
    });

    return () => s.disconnect();
  }, [token]);

  const send = () => {
    const s = getSocket();
    s.emit("message", msg);
    setMsg("");
  };

  const handleTyping = () => {
    const s = getSocket();
    s.emit("typing");
  };

  return (
    <div style={{ maxWidth: 600, margin: "30px auto", textAlign: "left" }}>
      <h2>Chat Room</h2>
      <div style={{ border: "1px solid #ccc", height: 300, overflowY: "scroll", padding: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ color: m.system ? "gray" : "black" }}>
            {m.system ? m.text : `${m.user}: ${m.text}`}
          </div>
        ))}
      </div>
      {typingUser && <div style={{ color: "gray" }}>{typingUser} is typing...</div>}
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={handleTyping}
        style={{ width: "80%" }}
      />
      <button onClick={send}>Send</button>
    </div>
  );
}
