import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { ErrorContext } from "../../contexts/ErrorContext";

import { createMovie } from "../../services/movieService";

export function Create() {
    const { user } = useContext(AuthContext);
    const { errorHandler } = useContext(ErrorContext);

    const navigate = useNavigate();
    const [values, setValues] = useState({
        title: '',
        genre: '',
        imageUrl: '',
        year: '',
        description: ''
    });

    function changeHandler(e) {
        setValues(state => {
            return {
                ...state,
                [e.target.name]: e.target.value
            }
        });
    }

    function submitHandler(e) {
        e.preventDefault();

        createMovie(values, user._id)
            .then(() => {
                navigate('/catalog');
            })
            .catch(err => {
                errorHandler({ message: err.response.data });
            });
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={submitHandler}>
                <h2 className="form-title">Create</h2>

                <label className="labels" htmlFor="title">Title:</label>
                <input
                    className="inputs"
                    type="text"
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={changeHandler}
                />

                <label className="labels" htmlFor="genre">Genre:</label>
                <input
                    className="inputs"
                    type="text"
                    id="genre"
                    name="genre"
                    value={values.genre}
                    onChange={changeHandler}
                />

                <label className="labels" htmlFor="imageUrl">Image Url:</label>
                <input
                    className="inputs"
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={values.imageUrl}
                    onChange={changeHandler}
                />

                <label className="labels" htmlFor="year">Year:</label>
                <input
                    className="inputs"
                    type="text"
                    id="year"
                    name="year"
                    value={values.year}
                    onChange={changeHandler}
                />

                <label className="labels" htmlFor="description">Description:</label>
                <textarea  
                    className="inputs"   
                    name="description"
                    id="description"   
                    cols="30" 
                    rows="10"
                    value={values.description}
                    onChange={changeHandler}
                >   
                </textarea>

                <input className="form-button" type="submit" value="Submit"/>

            </form>
        </div>  
    );
}