import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!title || !description || !image || !email) {
                setError('Please fill all fields');
                return;
            }

            const response = await axios.post(
                'http://localhost:5000/create-blog',
                {
                    title,
                    description,
                    image,
                    email // Pass the email to the backend
                }
            );

            if (response.data.message) {
                setSuccessMessage('Blog created successfully');
                setTitle('');
                setDescription('');
                setImage('');
                setEmail('');
                setError('');
            } else {
                setError('Failed to create blog');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h2>Create a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Blog
                </button>
            </form>
            {error && <p className="text-danger mt-2">{error}</p>}
            {successMessage && <p className="text-success mt-2">{successMessage}</p>}
        </div>
    );
};

export default CreateBlog;
