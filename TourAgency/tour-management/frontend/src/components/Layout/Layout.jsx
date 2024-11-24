import React from "react"
import { Link } from 'react-router-dom';
import Header from '../Header/Header.jsx';


const Layout = ({ children, isAuthenticated, onLogout }) => {
    return (
        <div>
            <Header isAuthenticated={isAuthenticated} onLogout={onLogout} /> {/* Передаем props */}
            <main>
                {children}
            </main>
            <footer>
                {/* Ваш footer */}
            </footer>
        </div>
    );
};

export default Layout;