import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Form.css';

import { AuthContext } from "../../contexts/AuthContext";
import { ErrorContext } from "../../contexts/ErrorContext";

import { loginUser } from "../../services/authService";

export function Login() {
    const navigate = useNavigate();
    const { userLogin } = useContext(AuthContext); 
    const { errorHandler } = useContext(ErrorContext);
    const [values, setValues] = useState({
        email: '',
        password: ''
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

        const { email, password } = values;

        if (email == '' || password == '') {
            errorHandler({ message: 'Every field is required' });
            return navigate('/login');
        }
        
        loginUser(values)
            .then(res => {
                const userData = {
                    email: res.data.user.email,
                    _id: res.data.user._id,
                    token: res.data.token
                }
                userLogin(userData);
                navigate('/');
            })
            .catch(err => {
                errorHandler({message: err.response.data});
                navigate('/login');
            });
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={submitHandler}>
                <h2 className="form-title">Login</h2>

                <label className="labels" htmlFor="email">Email:</label>
                <input
                    className="inputs"
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={changeHandler}
                />

                <label className="labels" htmlFor="password">Password:</label>
                <input
                    className="inputs"
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={changeHandler}
                />

                <input className="form-button" type="submit" value="Submit"/>

                <p className="have-acc">Don't have an account? <Link to='/register'>Register</Link></p>
            </form>
        </div>
    );
}