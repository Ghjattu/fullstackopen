import React from 'react';
import PropTypes from 'prop-types';
import { updateBlogComments, updateBlogLikes } from '../reducers/BlogsReducer';
import { useDispatch } from 'react-redux';
import Comment from './Comment';

const Blog = ({ blog }) => {
	const dispatch = useDispatch();

	const handleLikeButtonClick = (id, oldBlog) => {
		const newBlog = { ...oldBlog, likes: oldBlog.likes + 1 };
		dispatch(updateBlogLikes(id, newBlog));
	};

	const handleCommentSubmit = (id, oldBlog, comment) => {
		const newBlog = { ...oldBlog, comments: oldBlog.comments.concat({ body: comment }) };
		dispatch(updateBlogComments(id, newBlog));
	};

	return (
		<div>
			<h2>{blog.title}</h2>
			<p><a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></p>
			<p>{blog.likes} likes <button onClick={() => handleLikeButtonClick(blog.id, blog)}>like</button></p>
			<p>added by {blog.user.username}</p>
			<Comment comments={blog.comments}
					 handleCommentSubmit={(comment) => handleCommentSubmit(blog.id, blog, comment)}/>
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object
};

export default Blog;