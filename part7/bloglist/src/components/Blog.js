import React from 'react';
import PropTypes from 'prop-types';
import { updateBlogLikes } from '../reducers/BlogsReducer';
import { useDispatch } from 'react-redux';

const Blog = ({ blog }) => {
	const dispatch = useDispatch();

	const handleLikeButtonClick = (id, oldBlog) => {
		const newBlog = { ...oldBlog, likes: oldBlog.likes + 1 };
		dispatch(updateBlogLikes(id, newBlog));
	};

	return (
		<div>
			<h2>{blog.title}</h2>
			<p><a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></p>
			<p>{blog.likes} likes <button onClick={() => handleLikeButtonClick(blog.id, blog)}>like</button></p>
			<p>added by {blog.user.username}</p>
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object
};

export default Blog;