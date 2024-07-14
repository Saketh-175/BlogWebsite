const blogModel = require('../model/blogmodel');
const userSchema = require('../model/userSchema');
const mongoose = require('mongoose');

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({});
        if (blogs.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No Blogs Found",
            });
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: "All Blogs",
            blogs,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: "Error in Getting blogs",
            error: err,
        });
    }
};
exports.createBlogs = async (req, res) => {
    try {
        const { title, description, image, email } = req.body;

        if (!title || !description || !image || !email) {
            return res.status(400).send({
                success: false,
                message: "Please fill all data",
            });
        }

        const existUser = await userSchema.findOne({ email });
        if (!existUser) {
            return res.status(404).send({
                success: false,
                message: 'Unable to find user'
            });
        }

        const newBlog = new blogModel({ title, description, image, user:existUser._id,username:existUser.name,email:existUser.email});
        const session = await mongoose.startSession();
        session.startTransaction();
        
        await newBlog.save({ session });
        
        existUser.blogs.push(newBlog);
        await existUser.save({ session });
        
        await session.commitTransaction();

        return res.status(201).send({
            success: true,
            message: 'Created blog',
            newBlog,
        });
    } catch (err) {
        console.error('Error creating blog:', err);
        return res.status(400).send({
            success: false,
            message: "Cannot create blog",
            error: err,
        });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        
        const updatedBlog = await blogModel.findByIdAndUpdate(id, { title, description, image }, { new: true });
        
        if (!updatedBlog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found',
            });
        }
        
        return res.status(200).send({
            success: true,
            message: 'Updated blog',
            updatedBlog,
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        return res.status(400).send({
            success: false,
            message: "Cannot update blog",
            error: error,
        });
    }
};

exports.getSingleBlog = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userSchema.findOne({ email:email});

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        const blogs = await blogModel.find({ email:user.email});

        if (!blogs || blogs.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No blogs found for this user",
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Blogs found',
            blogs,
        });

    } catch (error) {
        console.error('Error finding blogs:', error);
        return res.status(400).send({
            success: false,
            message: "Cannot find blogs",
            error: error,
        });
    }
};

exports.deleteBlogs = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await blogModel.findByIdAndDelete(id);
        
        if (!deletedBlog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found',
            });
        }
        
        await User.findByIdAndUpdate(deletedBlog.user, { $pull: { blogs: deletedBlog._id } });
        
        return res.status(200).send({
            success: true,
            message: 'Deleted blog',
        });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(400).send({
            success: false,
            message: "Cannot delete blog",
            error: error,
        });
    }
};
