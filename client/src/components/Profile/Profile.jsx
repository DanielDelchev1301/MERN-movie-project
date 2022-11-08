import './Profile.css';
import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { ErrorContext } from '../../contexts/ErrorContext';

import { MovieBox } from './MovieBox/MovieBox';
import { getUser } from '../../services/authService';

export function Profile() {
    const { user } = useContext(AuthContext);
    const { errorHandler } = useContext(ErrorContext);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUser(user._id)
            .then(res => {
                setUserData(state => res.data);
            })
            .catch(err => {
                errorHandler({ message: err.response.data });
            })
    }, []);

    return (
        <div className="profile-container">
            <div className="profile-card-box">
                <img src="./profile-icon.png" alt="profile-logo" />
                <h2>{userData.username}</h2>
            </div>
            <div className="profile-movies-container">
                <article className="profile-movies">
                    <h3 className='profile-movies-title'><em>Saved movies</em></h3>
                    {userData.savedMovies?.length > 0
                        ?   <MovieBox movies={userData.savedMovies}/>
                        :   <div className='not-found-profile'>
                                <p>Nothing saved</p>
                            </div>
                    }
                </article>
                <article className="profile-movies">
                <h3 className='profile-movies-title'><em>Created movies</em></h3>
                    {userData.myMovies?.length > 0
                        ?   <MovieBox movies={userData.myMovies}/>
                        :   <div className='not-found-profile'>
                                <p>Nothing created</p>
                            </div>
                    }
                </article>
            </div>
        </div>
    );
}