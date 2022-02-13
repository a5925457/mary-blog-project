import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';
import Dropdown from '../components/Dropdown';

const Write = () => {
    const { user } = useContext(Context);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);

    const [cat, setCat] = useState([]);

    const [selectedCat, setSelectedCat] = useState('請選擇分類');

    useEffect(() => {
        const fetchCat = async () => {
            const { data } = await axios.get('https://mary-blog-project.herokuapp.com/api/categories');
            setCat(data);
        };
        fetchCat();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
            categories: selectedCat === '請選擇分類' ? '' : selectedCat,
        };
        if (file) {
            const data = new FormData();
            data.append('file', file);
            try {
                const fileUpload = await axios.post('https://mary-blog-project.herokuapp.com/api/upload', data);
                newPost.photo = fileUpload.data.url;
            } catch (err) {}
        }
        try {
            const res = await axios.post('https://mary-blog-project.herokuapp.com/api/posts', newPost);
            window.location.replace('/post/' + res.data._id);
        } catch (err) {}
    };

    return (
        <div className="pt-5">
            {file && (
                <img className="ml-10 w-4/5 h-[250px] rounded object-cover" src={URL.createObjectURL(file)} alt="" />
            )}
            <form onSubmit={handleSubmit} className="relative">
                <div className="ml-10 flex items-center">
                    <label htmlFor="fileInput">
                        <i className="fa-solid fa-image w-[30px] h-[30px] flex items-center justify-center cursor-pointer text-gray-400 hover:text-gray-600 transition"></i>
                    </label>
                    <input
                        id="fileInput"
                        accept="image/png, image/gif, image/jpeg"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                    />
                    <input
                        className="ext-xl border-none p-3 w-4/5 focus:outline-none"
                        placeholder="請輸入標題"
                        type="text"
                        autoFocus={true}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>
                <div className="w-[300px] ml-10">
                    <Dropdown cat={cat} selectedCat={selectedCat} setSelectedCat={setSelectedCat} />
                </div>
                <div className="ml-10">
                    <textarea
                        className="border-none p-3 w-4/5 focus:outline-none"
                        placeholder="請輸入內容"
                        type="text"
                        autoFocus={true}
                        onChange={(e) => {
                            setDesc(e.target.value);
                        }}
                    />
                </div>
                <button
                    className="absolute top-[20px] right-[50px] bg-gray-400 px-3 py-1 rounded text-white hover:bg-gray-600 transition"
                    type="submit"
                >
                    發布
                </button>
            </form>
        </div>
    );
};

export default Write;
