const listHelper = require('../utils/list_helper');
const listWithOneBlog = require('../utils/list_helper').listWithOneBlog;
const blogs = require('../utils/list_helper').blogs;

describe('most blogs', () => {
    test('empty list', () => {
        expect(listHelper.mostBlogs([])).toEqual({});
    });

    test('only one blog', () => {
        expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        });
    });

    test('a bigger list', () => {
        expect(listHelper.mostBlogs(blogs)).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        });
    });
});