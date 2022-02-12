import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [cat, setCat] = useState([]);
    useEffect(() => {
        const fetchCat = async () => {
            const { data } = await axios.get('https://mary-blog-project.herokuapp.com/api/categories');
            setCat(data);
        };
        fetchCat();
    }, []);
    return (
        <div style={{ height: 'auto !important' }} className="basis-1/4 py-5 bg-gray-50 h-auto">
            <div className="flex flex-col items-center">
                <span className="border-b-2 border-gray-300 text-center">Mary Hsieh</span>
                <img className="mt-2 w-[250px] h-[250px]" src="/image/icon.svg" alt="" />
                <div className="p-6">
                    <p className="text-center mb-2">喜歡程式、畫畫以及韓國文化。</p>
                    <p className="text-center mb-2">永遠相信好可以更好。</p>
                    <Link
                        className="flex justify-center items-center "
                        to="#"
                        onClick={(e) => {
                            window.location = 'mailto:a5925457@gmail.com';
                            e.preventDefault();
                        }}
                    >
                        <i className="fa-solid fa-envelope"></i>
                        <p className="ml-2">a5925457@gmail.com</p>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <span className="border-b-2 border-gray-300 text-center">文章分類</span>
                <ul className="my-2">
                    {cat.map((item) => {
                        return (
                            <Link key={item._id} to={`/?cat=${item.name}`}>
                                <li className="cursor-pointer hover:text-gray-400 my-1">{item.name}</li>
                            </Link>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
