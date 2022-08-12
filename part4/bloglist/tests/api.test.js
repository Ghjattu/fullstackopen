const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const initialBlogs = require('../utils/list_helper').blogs;
const Blog = require('../models/blog');
const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    console.log('cleared');

    await Blog.insertMany(initialBlogs);
    console.log('done');
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('there are six blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(6);
});

test('there is a property named id', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined();
        expect(blog._id).not.toBeDefined();
    });
});

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'React is simple',
        author: 'Peter',
        url: 'https://example.com',
        likes: 0
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length + 1);

    const titles = response.body.map(blog => blog.title);
    expect(titles).toContain('React is simple');
});

test('missing likes property default to 0', async () => {
    const newBlog = {
        title: 'React is simple',
        author: 'Peter',
        url: 'https://example.com'
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length + 1);

    const titles = response.body.map(blog => blog.title);
    expect(titles).toContain('React is simple');
});

test('missing title or url', async () => {
    const newBlog = {
        author: 'Peter',
        likes: 0
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
});

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        let response = await api.get('/api/blogs');
        const blogsAtStart = response.body;
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);

        response = await api.get('/api/blogs');
        const blogsAtEnd = response.body;
        expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

        const titles = blogsAtEnd.map(blog => blog.title);
        expect(titles).not.toContain(blogToDelete.title);
    });
});

describe('update of a blog', () => {
    test('succeeds with valid data', async () => {
        let response = await api.get('/api/blogs');
        const blogToUpdate = response.body[0];
        const newBlog = {
            title: 'React is simple',
            author: 'Peter',
            url: 'https://example.com',
            likes: 0
        };

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        response = await api.get('/api/blogs');
        const titles = response.body.map(blog => blog.title);
        expect(titles).toContain(newBlog.title);
        expect(titles).not.toContain(blogToUpdate.title);
    });
});

afterAll(() => {
    mongoose.connection.close();
});