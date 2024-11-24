import React from "react"
import { Link } from 'react-router-dom';
import Header from '../Header/Header.jsx';


const Layout = ({ children, isAuthenticated, onLogout, username }) => {
    return (
        <div>
            <Header isAuthenticated={isAuthenticated} onLogout={onLogout} username={username} />
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