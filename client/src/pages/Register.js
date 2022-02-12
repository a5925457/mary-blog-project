import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post('https://mary-blog-project.herokuapp.com/api/auth/register', {
                username,
                email,
                password,
            });
            res.data && window.location.replace('/login');
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center" style={{ height: 'calc(100vh - 50px)' }}>
            <span className="text-xl border-b-2">註冊</span>
            <form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="username" className="text-sm">
                    帳號
                </label>
                <input
                    id="username"
                    className="p-3 border-b-2 focus:outline-none mb-3"
                    type="text"
                    placeholder="帳號"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <label htmlFor="email" className="text-sm">
                    Email
                </label>
                <input
                    id="email"
                    className="p-3 border-b-2 focus:outline-none mb-3"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                        setEmail(e.target.value);
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
                        setPassword(e.target.value);
                    }}
                />
                <button
                    type="submit"
                    className="mt-4 cursor-pointer bg-gray-400 text-white p-2 border-none rounded-lg text-center disabled:bg-slate-100 hover:bg-gray-600 transition"
                >
                    註冊
                </button>
            </form>
            <Link to="/login">
                <button className="absolute top-10 right-5 mt-4 cursor-pointer bg-gray-400 text-white p-2 border-none rounded-lg text-center hover:bg-gray-600 transition">
                    登入
                </button>
            </Link>
            {error ? <span className="mt-3">發生錯誤</span> : null}
        </div>
    );
};

export default Register;
