import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const Post = ({ id, title, desc, categories, createdAt, photo }) => {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 flex flex-col p-2">
            <Link to={`/post/${id}`}>
                {photo ? (
                    <div className="overflow-hidden rounded w-full mb-2 max-h-50">
                        <img className="object-cover hover:scale-105 transition" src={photo} alt="" />
                    </div>
                ) : (
                    <div className="overflow-hidden rounded w-full mb-2 max-h-50">
                        <img
                            className="object-cover hover:scale-105 transition"
                            src="https://fakeimg.pl/600x360/?text=No image"
                            alt=""
                        />
                    </div>
                )}
                <div className="flex items-center flex-col">
                    <div className="my-1">
                        {categories && (
                            <span className="text-[14px] text-gray-400 border border-gray-400 py-1 px-3 rounded-2xl">
                                {categories}
                            </span>
                        )}
                    </div>

                    <span className="text-2xl cursor-pointer">{title}</span>

                    <span className="text-gray-500">{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
                <p className="text-ellipsis overflow-hidden line-clamp-3">{desc}</p>
            </Link>
        </div>
    );
};

export default Post;
