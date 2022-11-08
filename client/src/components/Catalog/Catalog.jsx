import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import './Catalog.css';

import { ErrorContext } from "../../contexts/ErrorContext";

import { getAllMovies } from "../../services/movieService";
import { CardBox } from "../CardBox/CardBox";

export function Catalog() {
    const { errorHandler } = useContext(ErrorContext);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then(res => {
                setMovies(state => res.data);
            })
            .catch(err => {
                errorHandler({ message: err.response.data });
            });
    }, []);

    return (
            <section className='most-watched-section'>

                <h2 className='most-watched-title'>All Movies</h2>
                {movies
                ?   <CardBox movies={movies}/>
                :   <div className="not-found">
                        <h2>Nothing found.</h2>
                    </div>
                }

                <div className="want-to-do-something">
                    <article className="want-to-create-movie">
                        <h4>Didn't find the movie you love?</h4>
                        <p>In just few <Link to='/create'>Click</Link>s you can create one.</p>
                    </article>
                    <article className="want-to-create-account">
                        <h4>Don't have an account?</h4>
                        <p><Link to='/register'>Create</Link> one, it's easy.</p>
                    </article>
                </div>

            </section>
    );
}