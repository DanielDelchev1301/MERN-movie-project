import { Link } from 'react-router-dom';
import './Header.css';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
    const { user } = useContext(AuthContext);

    return (
        <header className='header-container'>
            <nav className='nav-container'>
                <ul className='nav-ul'>
                    {user.email &&
                        <p className='welcome-user'>Welcome, {user.email}! </p>
                    }
                    <Link to={'/'}>Home</Link>
                    <Link to={'/catalog'}>Movies</Link>
                    <Link to={'/search'}>Search</Link>
                    {user._id
                    ?   <>
                            <Link to={'/profile'}>Profile</Link>
                            <Link to={'/create'}>Create</Link>
                            <Link to={'/logout'}>Logout</Link>
                        </>
                    :   <>
                            <Link to={'/register'}>Register</Link>
                            <Link to={'/login'}>Login</Link>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
}