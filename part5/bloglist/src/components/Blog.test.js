import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('render content', () => {
	const blogs = [
		{
			title: 'test blog',
			author: 'ghjattu',
			url: 'https://example.com'
		}
	];

	const { container } = render(<Blog blogs={blogs}/>);
	const div = container.querySelector('.blog');
	expect(div).toHaveTextContent('test blog');
	expect(div).toHaveTextContent('ghjattu');
	expect(div).not.toHaveTextContent('https://example.com');
	expect(div).not.toHaveTextContent('likes');
});

describe('<Blog/>', () => {
	const testBlogs = [
		{
			title: 'test blog',
			author: 'ghjattu',
			url: 'https://example.com'
		}
	];
	let container;
	const updateBlog = jest.fn();

	beforeEach(() => {
		container = render(<Blog blogs={testBlogs} updateBlog={updateBlog}/>).container;
	});

	test('after view button click', async () => {
		const user = userEvent.setup();
		const button = screen.getByText('view');
		await user.click(button);

		const div = container.querySelector('.toggleable-content');
		expect(div).toHaveTextContent('https://example.com');
		expect(div).toHaveTextContent('likes');
	});

	test('click like button twice', async () => {
		const user = userEvent.setup();
		await user.click(screen.getByText('view'));

		const button = screen.getByText('like');
		await user.click(button);
		await user.click(button);

		expect(updateBlog.mock.calls).toHaveLength(2);
	});
});