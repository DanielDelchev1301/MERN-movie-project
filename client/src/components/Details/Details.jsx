import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import './Details.css';

import { AuthContext } from "../../contexts/AuthContext";
import { ErrorContext } from "../../contexts/ErrorContext";

import { getOneMovie, saveMovie, unsaveMovie, deleteMovie } from "../../services/movieService";

export function Details() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { errorHandler } = useContext(ErrorContext);

    const { _id } = useParams();
    const [movie, setMovie] = useState({});
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {

        getOneMovie(_id)
            .then(res => {
                let usersSaved = res.data.usersSaved;

                setMovie(state => res.data);

                setIsSaved(state => {
                    let boolean = false;
                    usersSaved.find(x => x._id == user._id ? boolean = true : boolean = false);
                    return boolean;
                });

            })
            .catch(err => {
                errorHandler({ message: err.response.data });
            });

    }, [_id]);

    function saveHandler() {
        saveMovie(_id, user._id)
            .then(() => {
                movie.usersSaved.push(user._id);
                setIsSaved(true);
            })
            .catch(err => {
                errorHandler({ message: err.response.data });
            });
    }

    function unsaveHandler() {
        unsaveMovie(_id, user._id)
            .then(() => {
                movie.usersSaved.shift();
                setIsSaved(false);
            })
            .catch(err => {
                errorHandler({ message: err.response.data });
            });
    }

    function deleteHandler() {
        deleteMovie(_id)
        .then(() => {
            navigate('/catalog');
        })
        .catch(err => {
            errorHandler({ message: err.response.data });
        });
    }

    return (
        <div className="details-container">
            <h1>Details</h1>
            <div className="details-movie">
                <img src={movie.imageUrl} alt={movie.title} />
                <h2>Title: {movie.title}</h2>
                <p>Genre: {movie.genre}</p>
                <p>Year: {movie.year}</p>
                <p>Description: {movie.description}</p>
                <p>Saved: {movie.usersSaved?.length} times</p>
                {user._id &&
                    <>
                        {user._id == movie.owner?._id
                            ? 
                            <>
                                <button><Link to={`/details/${movie._id}/edit`}>Edit</Link></button>
                                <button onClick={deleteHandler}>Delete</button>
                            </>
                            : 
                            <>  {isSaved
                                    ?   <button onClick={unsaveHandler}>Unsave</button>
                                    :   <button onClick={saveHandler}>Save</button>
                                }
                            </>
                        }
                    </>
                }
                <button><Link to={`/details/${movie.embed}/trailer/${movie.title}`}>Trailer</Link></button>
            </div >
        </div >
    );
}