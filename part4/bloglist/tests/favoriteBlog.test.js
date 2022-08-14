const listHelper = require('../utils/list_helper');
const listWithOneBlog = require('../utils/list_helper').listWithOneBlog;
const blogs = require('../utils/list_helper').blogs;

describe('favorite blog', () => {
    test('empty list', () => {
        expect(listHelper.favoriteBlog([])).toEqual({});
    });

    test('only one blog', () => {
        expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        });
    });

    test('a bigger list', () => {
        expect(listHelper.favoriteBlog(blogs)).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        });
    });
});