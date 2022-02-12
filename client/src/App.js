import { useContext } from 'react';
import { Context } from './context/Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Single from './pages/Single';
import Write from './pages/Write';
import Setting from './pages/Setting';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    const { user } = useContext(Context);
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={user ? <Home /> : <Register />} />
                <Route path="/login" element={user ? <Home /> : <Login />} />
                <Route path="/write" element={user ? <Write /> : <Register />} />
                <Route path="/setting" element={user ? <Setting /> : <Register />} />
                <Route path="/post/:postId" element={<Single />} />
            </Routes>
        </Router>
    );
};

export default App;
