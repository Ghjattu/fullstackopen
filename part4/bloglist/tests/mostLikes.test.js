const listHelper = require('../utils/list_helper');
const listWithOneBlog = require('../utils/list_helper').listWithOneBlog;
const blogs = require('../utils/list_helper').blogs;

describe('most likes', () => {
    test('empty list', () => {
        expect(listHelper.mostLikes([])).toEqual({});
    });

    test('only one blog', () => {
        expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        });
    });

    test('a bigger list', () => {
        expect(listHelper.mostLikes(blogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        });
    });
});