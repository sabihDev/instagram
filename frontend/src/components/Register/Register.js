// frontend/src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { username, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/login');
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={onSubmit} className="register-form">
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        placeholder="Username"
                        required
                    />
                </div>
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
                <button type="submit">Register</button>
                <Link className="register-link" to="/login">Have an account?<span>Login</span></Link>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default Register;
