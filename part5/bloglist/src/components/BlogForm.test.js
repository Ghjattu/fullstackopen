import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm/>', () => {
	test('create a new blog', async () => {
		const createNewBlog = jest.fn();
		const user = userEvent.setup();

		render(<BlogForm createNewBlog={createNewBlog}/>);
		const titleInput = screen.getByPlaceholderText('title');
		const authorInput = screen.getByPlaceholderText('author');
		const urlInput = screen.getByPlaceholderText('url');
		const button = screen.getByText('create');

		await user.type(titleInput, 'title');
		await user.type(authorInput, 'author');
		await user.type(urlInput, 'https://example.com');
		await user.click(button);

		expect(createNewBlog.mock.calls).toHaveLength(1);
		expect(createNewBlog.mock.calls[0][0].title).toBe('title');
		expect(createNewBlog.mock.calls[0][0].author).toBe('author');
		expect(createNewBlog.mock.calls[0][0].url).toBe('https://example.com');
	});
});