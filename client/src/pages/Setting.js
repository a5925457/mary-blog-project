import React, { useState, useContext } from 'react';
import { Context } from '../context/Context';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Setting = () => {
    const PF = 'https://mary-blog-project.herokuapp.com/images/';
    const { user, dispatch } = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        setSuccess(false);
        e.preventDefault();
        dispatch({ type: 'UPDATE_START' });
        const updateUser = {
            userId: user._id,
            username: user.username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            updateUser.profilePic = filename;
            try {
                await axios.post('https://mary-blog-project.herokuapp.com/api/upload', data);
            } catch (err) {}
        }
        try {
            const { data } = await axios.put(
                `https://mary-blog-project.herokuapp.com/api/users/${user._id}`,
                updateUser
            );
            setSuccess(true);
            dispatch({ type: 'UPDATE_SUCCESS', payload: data });
        } catch (err) {
            dispatch({ type: 'UPDATE_FAILURE' });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row">
            <Sidebar />
            <div className="basis-3/4 m-5">
                <span className="text-[30px]">修改個人資料</span>

                <form onSubmit={handleSubmit} className="flex flex-col mt-3">
                    <label>個人圖片</label>
                    <div className="flex items-center my-3">
                        <img
                            className="w-[100px] h-[100px] rounded object-cover"
                            src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="fa-solid fa-rotate w-[25px] h-[25px] rounded-full flex items-center justify-center cursor-pointer text-gray-400 hover:text-gray-600 transition"></i>{' '}
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                            }}
                        />
                    </div>
                    <label htmlFor="username" className="text-sm">
                        帳號
                    </label>
                    <input
                        className="focus:outline-none text-gray-500 my-3 border-b-2"
                        id="username"
                        type="text"
                        placeholder={user.username}
                        name="name"
                        disabled={true}
                    />
                    <label htmlFor="email" className="text-sm">
                        Email
                    </label>
                    <input
                        className="focus:outline-none text-gray-500 my-3 border-b-2"
                        id="email"
                        type="email"
                        placeholder={user.email}
                        name="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <label htmlFor="password" className="text-sm">
                        密碼
                    </label>
                    <input
                        className="focus:outline-none text-gray-500 my-3 border-b-2"
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button
                        className="bg-gray-400 w-1/4 m-auto rounded-lg py-1 text-white hover:bg-gray-600 transition"
                        type="submit"
                    >
                        修改資料
                    </button>
                    {success && (
                        <div className="flex items-center">
                            <i className="fa-solid fa-check mr-2"></i>
                            <span>資料修改成功！</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Setting;
