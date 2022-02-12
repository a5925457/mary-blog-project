import React from 'react';
import Post from './Post';

const Posts = ({ posts }) => {
    const postsList = posts.map((item) => {
        return (
            <Post
                key={item._id}
                id={item._id}
                title={item.title}
                desc={item.desc}
                categories={item.categories}
                createdAt={item.createdAt}
                photo={item.photo ? item.photo : null}
            />
        );
    });
    return <div className="basis-3/4 flex flex-wrap m-5">{postsList}</div>;
};

export default Posts;
