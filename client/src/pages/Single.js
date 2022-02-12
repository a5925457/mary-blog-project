import React from 'react';
import Sidebar from '../components/Sidebar';
import SinglePost from '../components/SinglePost';

const Single = () => {
    return (
        <div className="flex flex-col sm:flex-row">
            <Sidebar />
            <SinglePost />
        </div>
    );
};

export default Single;
