import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../context/Context';
import dayjs from 'dayjs';

import { useLocation, Link } from 'react-router-dom';

const SinglePost = () => {
    const PF = 'https://mary-blog-project.herokuapp.com/images/';
    const { user } = useContext(Context);
    const useLoction = useLocation();
    const path = useLoction.pathname.split('/')[2];
    const [post, setPost] = useState({});
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            const fetchPost = async () => {
                const { data } = await axios.get(`https://mary-blog-project.herokuapp.com/api/posts/${path}`);
                setPost(data);
                setTitle(data.title);
                setDesc(data.desc);
            };
            fetchPost();
        }
        return () => {
            isMounted = false;
        };
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://mary-blog-project.herokuapp.com/api/posts/${post._id}`, {
                data: { username: user.username },
            });
            window.location.replace('/');
        } catch (err) {}
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`https://mary-blog-project.herokuapp.com/api/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false);
        } catch (err) {}
    };

    return (
        <div className="basis-3/4 flex m-5">
            <div className="w-full">
                {post.photo ? (
                    <img className="w-full h-[300px] object-cover rounded mb-4" src={`${PF}${post.photo}`} alt="" />
                ) : null}
                {updateMode ? (
                    <input
                        className="text-[28px] flex justify-between focus:outline-none"
                        type="text"
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="text-[28px] flex justify-between">
                        {title}
                        {post.username === user?.username && (
                            <div className="justify-self-end">
                                <i
                                    onClick={() => setUpdateMode(true)}
                                    className="cursor-pointer fas fa-pen text-[16px] mr-2 text-gray-400 hover:text-gray-600 transition"
                                ></i>
                                <i
                                    onClick={handleDelete}
                                    className="cursor-pointer fas fa-trash text-[16px] text-gray-400 hover:text-gray-600 transition"
                                ></i>
                            </div>
                        )}
                    </h1>
                )}

                <div className="flex mt-2 mb-5 justify-between">
                    <span>
                        By&nbsp;
                        <Link to={`/?user=${post.username}`}>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span>{dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
                {updateMode ? (
                    <textarea
                        cols="50"
                        rows="5"
                        className="text-[18px] leading-relaxed focus:outline-none"
                        defaultValue={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ) : (
                    <p className="text-[18px] leading-relaxed">{desc}</p>
                )}

                {updateMode ? (
                    <div className="flex justify-center">
                        <button
                            onClick={handleUpdate}
                            className="mt-3 w-1/4 border-none bg-slate-400 text-white p-2 rounded cursor-pointer"
                        >
                            更新
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default SinglePost;
