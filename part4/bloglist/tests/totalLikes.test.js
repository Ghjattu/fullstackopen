const listHelper = require('../utils/list_helper');
const listWithOneBlog = require('../utils/list_helper').listWithOneBlog;
const blogs = require('../utils/list_helper').blogs;

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0);
    });

    test('when list has only one blog, equals the likes of that', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(5);
    });

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36);
    });
});