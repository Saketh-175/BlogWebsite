import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './context/AuthContext';
import CreateBlog from './components/Createblog';
import DeleteBlog from './components/DeleteBlog';
const App = () => {
    return (
        <>
        <AuthProvider>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/CreateBlog" element={<CreateBlog />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/Deleteblog" element={<DeleteBlog />} />
                </Routes>
                </AuthProvider>
                </>
    );
}

export default App;
