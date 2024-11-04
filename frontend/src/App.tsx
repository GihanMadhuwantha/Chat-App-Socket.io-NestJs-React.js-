// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Chat from "./components/Chat";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <div >
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/chat"  element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
