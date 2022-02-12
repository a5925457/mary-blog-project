import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';

const Login = () => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [failure, setFailue] = useState(false);

    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('https://mary-blog-project.herokuapp.com/api/auth/login', {
                username: enteredUsername,
                password: enteredPassword,
            });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            setFailue(false);
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE' });
            setFailue(true);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center" style={{ height: 'calc(100vh - 50px)' }}>
            <span className="text-xl border-b-2">登入</span>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col">
                <label htmlFor="username" className="text-sm">
                    帳號
                </label>
                <input
                    id="username"
                    className="loginInput p-3 border-b-2 focus:outline-none mb-3"
                    type="text"
                    placeholder="帳號"
                    onChange={(e) => {
                        setEnteredUsername(e.target.value);
                    }}
                />
                <label htmlFor="password" className="text-sm">
                    密碼
                </label>
                <input
                    id="password"
                    className="p-3 border-b-2 focus:outline-none"
                    type="password"
                    placeholder="密碼"
                    onChange={(e) => {
                        setEnteredPassword(e.target.value);
                    }}
                />
                <button
                    className="mt-4 cursor-pointer bg-gray-400 text-white p-2 border-none rounded-lg text-center disabled:bg-slate-100 hover:bg-gray-600 transition"
                    disabled={isFetching}
                >
                    登入
                </button>
            </form>
            <Link to="/register">
                <button
                    type="submit"
                    className="absolute top-10 right-5 mt-4 cursor-pointer bg-gray-400 text-white p-2 border-none rounded-lg text-center hover:bg-gray-600 transition"
                >
                    註冊
                </button>
            </Link>
            {failure && <span className="mt-4 text-slate-600">帳號或密碼有錯</span>}
        </div>
    );
};

export default Login;
