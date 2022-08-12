const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const initialBlogs = require('../utils/list_helper').blogs;
const Blog = require('../models/blog');
const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    console.log('cleared');

    const blogObjects = initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
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

afterAll(() => {
    mongoose.connection.close();
});