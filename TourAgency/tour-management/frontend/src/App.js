import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Routers from "./router/Router.js"; // Импорт Routers

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };


  return (
      <Router>
          <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
              <Routers isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> {/* Передаем setIsAuthenticated */}
          </Layout>
      </Router>
  );
}

export default App;