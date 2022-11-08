import './Search.css';
import { useState, useContext } from "react";

import { CardBox } from "../CardBox/CardBox";
import { searchMovies } from '../../services/movieService';
import { ErrorContext } from '../../contexts/ErrorContext';

export function Search() {
    const { errorHandler } = useContext(ErrorContext);
    const [searchValue, setSearchValue] = useState({
        search: ''
    });
    const [searchedMovies, setSearchedMovies] = useState(null);

    function changeHandler(e) {
        setSearchValue(state => {
            return {
                search: e.target.value
            }
        });
    }

    function submitHandler(e) {
        e.preventDefault();

        searchMovies(searchValue)
            .then(res => {
                setSearchedMovies(state => res.data);
            })
            .catch(err => {
                errorHandler({message: err.response.data});
            });
    }

    return (
        <section className="search-container">

            <form className="search-form" onSubmit={submitHandler}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search..."
                    name="search"
                    value={searchValue.search}
                    onChange={changeHandler}
                />

                <input className="search-button" type="submit" value="Search" />
            </form>

            <div className="container">
            <h2 className='most-watched-title'>Searched movies</h2>
                {searchedMovies && searchedMovies[0]
                ?   <section className='most-watched-section'>
                        <CardBox movies={searchedMovies}/>
                    </section>
                :   <div className="not-found">
                        <h2>Nothing found.</h2>
                    </div>
                }
            </div>

        </section>
    );
}