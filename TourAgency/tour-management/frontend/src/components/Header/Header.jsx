import React, {useRef, useEffect} from "react"
import {Container, Row, Button, Nav} from 'reactstrap'
import {NavLink, Link} from 'react-router-dom'


import logo from '../../assets/images/logo.png'
import './header.css';

const nav__links=[
    {
        path:'/home',
        display:'Home'
    },
    {
        path:'/about',
        display:'About'
    },
    {
        path:'/tours',
        display:'Tours'
    }
]
const Header = ({ isAuthenticated, onLogout, username, isAdmin }) => {

    const headerRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current) {
                if (window.pageYOffset > 80) {
                    headerRef.current.classList.add('sticky__header')
                } else {
                    headerRef.current.classList.remove('sticky__header')
                }
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll); // !!! Очистка
    }, []); // !!! Пустой массив зависимостей

    return <header className="header" ref={headerRef}>
        <Container>
            <Row>
                <div className="nav__wrapper d-flex align-items-center 
                justify-content-between">
                    {/* ============= logo =========== */}
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    {/* ============= logo end=========== */}

                    {/* =============menu start=========== */}
                    <div className="navigation">
                        <ul className="menu d-flex align-items-center gap-5">
                            {
                                nav__links.map((item,index)=>(
                                    <li className="nav__item" key={index}>
                                        <NavLink to={item.path} className={navClass=> navClass.isActive ? 'active__link' : ""}>{item.display}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {/* =============menu end=========== */}

                    <div className="nav__right d-flex align-items-center gap-4">
                        <div className="nav__btns d-flex align-items-center gap-4">
                            {isAuthenticated ? (
                                <>
                                    {isAdmin && ( // !!!  Если isAdmin === true
                                        <Button className="btn secondary__btn">
                                            <Link to="/add-tour">Add Tour</Link>

                                        </Button>
                                    )}

                                    <>{username}</>
                                    <Button className="btn secondary__btn" onClick={onLogout}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button className="btn secondary__btn">
                                        <Link to="/login">Login</Link>
                                    </Button>
                                    <Button className="btn primary__btn">
                                        <Link to="/register">Register</Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        <span className="mobile_menu">
                            <i className="ri-menu-line"></i>
                        </span>

                    </div>
                </div>
            </Row>
        </Container>
    </header>
}

export default Header;