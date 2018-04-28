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
                    <li><NavLink exact to='/' activeClassName="active">Home</NavLink></li>
                    <li><NavLink exact to='/watchlist' activeClassName="active">Watchlist</NavLink></li>
                    <li><NavLink exact to='/charting' activeClassName="active">Charting</NavLink></li>
                    <li><NavLink to='/unmatched' activeClassName="active">Unmatched List</NavLink></li>
                    <li><NavLink to='/settings' activeClassName="active">Settings</NavLink></li>
                </ul>
            </div>
        </nav>
    </header>
)

export default Header
