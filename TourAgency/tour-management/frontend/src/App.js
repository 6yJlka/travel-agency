import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Routers from "./router/Router.js"; // Импорт Routers

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
      const storedUsername = localStorage.getItem("username");
      if (username === 'admin') { // !!! Проверяем, является ли пользователь admin
          localStorage.setItem('isAdmin', 'true'); // !!!  Сохраняем флаг isAdmin
      }
      if (storedUsername) {
          setUsername(storedUsername);
      }
  }, [username]);

    const [isAdmin, setIsAdmin] = useState(false); // !!!  State для проверки роли admin

    useEffect(() => {
        const isAdminFlag = localStorage.getItem('isAdmin');
        setIsAdmin(isAdminFlag === 'true');
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username")
        setIsAuthenticated(false);
        setUsername(null);
        localStorage.removeItem('isAdmin'); // !!!  Удаляем флаг isAdmin
        setIsAdmin(false); // !!!
    };


  return (
      <Router>
          <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout} username={username} isAdmin={isAdmin}> {/* !!! Передаем username в Layout */}
              <Routers isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> {/* Передаем setIsAuthenticated */}
          </Layout>
      </Router>
  );
}

export default App;