import React from 'react'
import { NavLink } from 'react-router-dom'

import './styles/css/Header.css'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <header className="header">
        <nav className="nav">
            <div className="nav-elements">
                <div className="branding">
                    <h3>Movies Web App</h3>
                </div>
                <ul className="navbar">
                    <li><NavLink exact to='/' activeStyle={{ fontWeight: 'bold', color: 'red' }}>Home</NavLink></li>
                    <li><NavLink exact to='/watchlist' activeStyle={{ fontWeight: 'bold', color: 'red' }}>Watchlist</NavLink></li>
                    <li><NavLink to='/unmatched' activeStyle={{ fontWeight: 'bold', color: 'red' }}>Unmatched List</NavLink></li>
                    <li><NavLink to='/about' activeStyle={{ fontWeight: 'bold', color: 'red' }}>About</NavLink></li>
                </ul>
            </div>
        </nav>
    </header>
)

export default Header
