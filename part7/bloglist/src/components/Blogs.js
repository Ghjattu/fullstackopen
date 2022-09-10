import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlogById } from '../reducers/BlogsReducer';
import BlogForm from './BlogForm';
import Toggleable from './Togglable';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const style = {
	border: '1px solid black',
	margin: '10px 0'
};

const Blogs = ({ blogs, filter }) => {
	const dispatch = useDispatch();

	const currentUser = useSelector(state => state.User.user);

	let header;
	if (filter) {
		header = `${currentUser.username}'s blogs`;
		blogs = blogs.filter(blog => blog.user.username === currentUser.username);
	} else {
		header = 'all blogs';
	}

	const handleRemoveButtonClick = (id, title, author) => {
		if (window.confirm(`Remove blog ${title} by ${author}?`)) {
			dispatch(deleteBlogById(id));
		}
	};

	return (
		<div>
			<Toggleable buttonLabel='new blog'>
				<BlogForm/>
			</Toggleable>
			<h2>{header}</h2>
			{blogs.map((blog) =>
				<p key={blog.id} style={style}>
					<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
					{filter &&
						<button type="submit"
									   onClick={() => handleRemoveButtonClick(blog.id, blog.title, blog.author)}>remove
						</button>}
				</p>
			)}
		</div>
	);
};

Blogs.propTypes = {
	blogs: PropTypes.array,
	filter: PropTypes.bool
};

export default Blogs;
