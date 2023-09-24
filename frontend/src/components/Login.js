import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorize } from '../utils/Auth.js';

const Login = (props) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        }
        authorize(formValue.email, formValue.password)
            .then((data) => {
                localStorage.setItem('token', data.token)
                setFormValue({ email: '', password: '' });
                props.onSucess();
                navigate('/', { replace: true });
            })
            .catch((err) => {
                props.onError()
            });
    }

    return (
        <div className="register">
            <h2 className="register__header">Вход</h2>
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
                <button type="submit" onSubmit={handleSubmit} className="save-button save-button_theme_dark">Войти</button>
            </form >
        </div >
    );
}

export default Login; 