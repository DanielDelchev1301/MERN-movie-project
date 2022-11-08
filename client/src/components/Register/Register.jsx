import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";
import { ErrorContext } from "../../contexts/ErrorContext";

export function Register() {
    const navigate = useNavigate();
    const { userLogin } = useContext(AuthContext);
    const { errorHandler } = useContext(ErrorContext);

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        const { username, email, password, confirmPassword } = values;

        if (username == '' || email == '' ||
            password == '' || confirmPassword == '') {
                errorHandler({ message: 'Every field is required' });
                return navigate('/register');
        }

        if (password != confirmPassword) {
            errorHandler({ message: 'Password must be equal to confirm password' });
            return navigate('/register');
        }

        registerUser(values)
            .then(res => {
                const userData = {
                    email: res.data.createdUser.email,
                    _id: res.data.createdUser._id,
                    token: res.data.token
                }
                userLogin(userData);
                navigate('/');
            })
            .catch(err => {
                errorHandler({message: err.response.data});
                navigate('/register');
            });
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={submitHandler}>
                <h2 className="form-title">Register</h2>

                <label className="labels" htmlFor="username">Username:</label>
                <input
                    className="inputs"
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={changeHandler}
                />

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

                <label className="labels" htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    className="inputs"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={changeHandler}
                />

                <input className="form-button" type="submit" value="Submit" />

                <p className="have-acc">You have an account? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    );
}