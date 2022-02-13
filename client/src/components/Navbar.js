import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

const Navbar = () => {
    const { user, dispatch } = useContext(Context);
    const [keyword, setKeyword] = useState('');

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const handleSearch = async () => {
        window.location.replace(`/?title=${keyword}`);
    };

    return (
        <div className="w-full bg-white h-[50px] sticky top-0 flex items-center z-10 shadow-sm">
            <div className="basis-1/4">
                <div className="ml-3">
                    <Link to="/" className="hover:text-gray-400">
                        Mary's Blog
                    </Link>
                </div>
            </div>
            <div className="basis-3/4 flex justify-end items-center pr-2">
                <ul className="flex justify-center items-center">
                    {user && (
                        <li className="mr-2 text-[16px] cursor-pointer">
                            <Link to="/write" className="hover:text-gray-400">
                                寫文章
                            </Link>
                        </li>
                    )}
                    <li onClick={handleLogout} className="mr-2 text-[16px] cursor-pointer hover:text-gray-400">
                        {user && '登出'}
                    </li>
                </ul>
                {user ? (
                    <Link to="/setting">
                        <img
                            className="object-cover rounded-full w-[40px] h-[40px] mr-2"
                            src={user.profilePic ? user.profilePic : 'https://fakeimg.pl/40x40/?text=No image'}
                            alt=""
                        />
                    </Link>
                ) : (
                    <>
                        <Link to="/login" className="mr-2 text-[16px] hover:text-gray-400">
                            登入
                        </Link>
                        <Link to="/register" className="mr-2 text-[16px] hover:text-gray-400">
                            註冊
                        </Link>
                    </>
                )}
                <input
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}
                    type="text"
                    placeholder="輸入文章名"
                    className="border-b-2 border-gray-200 focus:outline-none focus:border-gray-400 transition text-sm"
                    style={{ width: '100px' }}
                />
                <i
                    onClick={handleSearch}
                    className="fas fa-search ml-2 text-[20px] cursor-pointer text-gray-400 hover:text-gray-600 transition"
                ></i>
            </div>
        </div>
    );
};

export default Navbar;
