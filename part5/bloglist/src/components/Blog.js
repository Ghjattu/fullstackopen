import React, { useState } from 'react';
import PropTypes from 'prop-types';

const style = {
	border: '1px solid black',
	margin: '10px 0'
};

const Blog = ({ blogs, updateBlog, deleteBlog }) => {
	const [visible, setVisible] = useState(new Array(blogs.length).fill(false));

	const handleVisibleButtonClick = (i) => {
		const newVisible = Array.from(visible);
		newVisible[i] = !newVisible[i];
		setVisible(newVisible);
	};

	const handleLikeButtonClick = (id, oldBlog) => {
		const newBlog = { ...oldBlog, likes: oldBlog.likes + 1 };
		updateBlog(id, newBlog);
	};

	const handleRemoveButtonClick = (id, title, author) => {
		if (window.confirm(`Remove blog ${title} by ${author}?`)) {
			console.log(typeof deleteBlog);
			deleteBlog(id);
		}
	};

	return (
		<div>
			{blogs.map((blog, index) =>
				<div key={blog.id} style={style} className="blog">
					<p>
						{blog.author}: {blog.title}
						<button onClick={() => handleVisibleButtonClick(index)}>
							{visible[index] ? 'hide' : 'view'}
						</button>
					</p>
					{visible[index] && <div className="toggleable-content">
						<p>{blog.url}</p>
						<p>likes {blog.likes} <button onClick={() => handleLikeButtonClick(blog.id, blog)}>like</button></p>
						<button onClick={() => handleRemoveButtonClick(blog.id, blog.title, blog.author)}>remove</button>
					</div>}
				</div>
			)}
		</div>
	);
};

Blog.propTypes = {
	blogs: PropTypes.array,
	updateBlog: PropTypes.func,
	deleteBlog: PropTypes.func
};

export default Blog;
