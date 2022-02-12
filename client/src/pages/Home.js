import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const { search } = useLocation();
    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await axios.get(`https://mary-blog-project.herokuapp.com/api/posts${search}`);
            setPosts(data);
        };
        fetchPosts();
    }, [search]);

    return (
        <div>
            <div className="flex flex-col sm:flex-row">
                <Sidebar />
                <Posts posts={posts} />
            </div>
        </div>
    );
};

export default Home;
