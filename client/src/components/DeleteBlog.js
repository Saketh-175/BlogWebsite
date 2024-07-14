import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const DeleteBlog = () => {
    const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false); // Track if form has been submitted

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/get-blog/${email}`);
      if (response.data && Array.isArray(response.data.blogs)) {
        setBlogs(response.data.blogs);
      } else {
        setBlogs([]);
      }
      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      setError(err);
      setLoading(false);
      setSubmitted(true); 
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5000/delete-blog/${blogId}`)
    } catch (err) {
        alert("deleted succesfull");
    }
    finally{
        navigate('/');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  return (
    <div>
      <header className="bg-dark text-white p-5 text-center">
        <h1>Delete a Blog</h1>
      </header>

      <main className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              {submitted && (
                <div className="list-group mt-4">
                  {blogs.length > 0 ? (
                    blogs.map(blog => (
                      <div key={blog._id} className="list-group-item list-group-item-action">
                        <h2>{blog.title}</h2>
                        <p>{blog.description}</p>
                        <p className="author">Author: {blog.username}</p>
                        <p className="date">Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(blog._id)}
                        >
                          Delete Blog
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No blogs found.</p>
                  )}
                </div>
              )}
              {loading && <div>Loading...</div>}
              {error && <div>Error fetching or deleting blogs: {error.message}</div>}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; 2023 Our Blog</p>
      </footer>
    </div>
  );
};

export default DeleteBlog;
