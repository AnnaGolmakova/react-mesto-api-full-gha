import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../utils/Auth.js';
import '../blocks/register/register.css';

const Register = (props) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = formValue;
        register(email, password)
            .then((res) => {
                props.onSucess()
            })
            .catch((err) => {
                props.onError()
            })
    }

    return (
        <div className="register">
            <h2 className="register__header">Регистрация</h2>
            <form onSubmit={handleSubmit} className="register__form">
                <div className="register__inputs">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formValue.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="register__input"
                        required
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formValue.password}
                        onChange={handleChange}
                        placeholder="Пароль"
                        className="register__input"
                        required
                    />
                </div>
                <button type="submit" onSubmit={handleSubmit} className="save-button save-button_theme_dark">Зарегистрироваться</button>
            </form >
            <div className="register__signup">
                <span>Уже зарегистрированы?&nbsp;</span>
                <Link to="/sign-in" className="register__login-link">Войти</Link>
            </div>
        </div >
    );
}

export default Register;