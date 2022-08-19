import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createNewBlog }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleAuthorChange = (e) => {
		setAuthor(e.target.value);
	};

	const handleUrlChange = (e) => {
		setUrl(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		createNewBlog({ title, author, url });
		setTitle('');
		setAuthor('');
		setUrl('');
	};

	return (
		<div>
			<h2>create new blog</h2>
			<form onSubmit={handleSubmit}>
				<div>title<input type="text" value={title} name="title"
								 onChange={handleTitleChange}/></div>
				<div>author<input type="text" value={author} name="author"
								  onChange={handleAuthorChange}/></div>
				<div>url<input type="text" value={url} name="url" onChange={handleUrlChange}/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

BlogForm.propTypes = {
	createNewBlog: PropTypes.func
};

export default BlogForm;