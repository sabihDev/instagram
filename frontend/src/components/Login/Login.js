// frontend/src/components/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { login as loginUserApi } from '../../services/api';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { login } = useContext(AuthContext);
    const [error, setError] = useState('');

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUserApi(formData);
            localStorage.setItem('token', res.data.token);
            login(formData);
            navigate('/')
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={onSubmit} className="login-form">
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <Link className="register-link" to="/register">Do not have an account?<span>Register</span></Link>
                {error && <div className="error-message">{error}</div>}

            </form>
        </div>
    );
};

export default Login;
