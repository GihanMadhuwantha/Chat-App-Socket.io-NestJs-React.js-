import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:5000");

const Chat: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (username && message) {
      socket.emit("sendMessage", { username, message });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Chat Application</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded p-2 mr-2"
        />
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white rounded p-2">Send</button>
      </div>
      <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <h2 className="font-bold">Messages:</h2>
        <ul className="list-disc">
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.username}: </strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
