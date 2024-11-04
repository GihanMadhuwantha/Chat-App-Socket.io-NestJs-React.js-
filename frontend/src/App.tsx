// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Chat from "./components/Chat";

const App: React.FC = () => {
  return (
    <Router>
      <div >
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
