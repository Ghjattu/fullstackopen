const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user');
    response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
        response.json(blog);
    } else {
        response.status(404).end();
    }
});

blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    const user = request.user;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id,
        comments: []
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    const returnedBlog = await Blog.findById(savedBlog._id).populate('user');

    response.status(201).json(returnedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } else {
        response.status(401).json({ error: 'You can not delete other users\' blogs' });
    }
});

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        comments: body.comments
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user');
    response.status(201).json(updatedBlog);
});

module.exports = blogsRouter;