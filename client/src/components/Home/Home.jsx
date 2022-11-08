import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import './CardBox.css'

import { ErrorContext } from '../../contexts/ErrorContext';

import { getMostWatchedMovies } from '../../services/movieService';
import { CarouselList } from './Carousel/CarouselList';
import { CardBox } from '../CardBox/CardBox';

export function Home() {
    const { errorHandler } = useContext(ErrorContext);
    const [mostWatched, setMostWatched] = useState([]);

    useEffect(() => {
        getMostWatchedMovies()
            .then(res => {
                setMostWatched(state => res.data);
            })
            .catch(err => {
                errorHandler({ message: err.response.data });
            });
    }, []);

    return (
        <div className="home-container">
            <h1 className='home-title'>Movies Factory</h1>
            <p className='title-description'>Movie Factory is one of the most popular web application out there. We have try to deliver the best quality possible. Here you can find various of movies, you can save them for later or even watch the trailer. All you need to is to do if you don't have an account is to <Link to='/register'>Sign Up</Link>. Go ahead it's easy, in just few clicks. </p>
            <CarouselList movies={mostWatched}/>
            <section className='most-watched-section'>
                <h2 className='most-watched-title'>Most watched</h2>
                {mostWatched
                    ?   <CardBox movies={mostWatched}/>
                    :   <div className="not-found">
                            <h2>Nothing found.</h2>
                        </div>
                }
            </section>
        </div>
    );
}