import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/all-blog');
                if (response.data && Array.isArray(response.data.blogs)) {
                    setBlogs(response.data.blogs);
                } else {
                    setBlogs([]);
                }
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <header className="bg-dark text-white p-5 text-center">
                <h1>Welcome to Our Blog</h1>
            </header>

            <main className="py-4">
                <div className="container">
                    <div className="row">
                        {blogs.length > 0 ? (
                            blogs.map(blog => (
                                <div key={blog._id} className="col-md-6">
                                    <a href="#" className="list-group-item list-group-item-action mb-4">
                                        <h2>{blog.title}</h2>
                                        <img src={blog.image} alt={blog.title} className="img-fluid" />
                                        <p>{blog.description}</p>
                                        <p className="author">Author: {blog.username}</p>
                                        <p className="date">Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p className="col-md-12">No blogs found.</p>
                        )}
                    </div>
                </div>
            </main>

            <footer className="bg-dark text-white text-center py-3">
                <p>&copy; 2023 Our Blog</p>
            </footer>
        </div>
    );
};

export default Home;
