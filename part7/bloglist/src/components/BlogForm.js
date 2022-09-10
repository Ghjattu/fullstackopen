import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthor, setTitle, setUrl } from '../reducers/BlogFormReducer';
import { createBlog } from '../reducers/BlogsReducer';

const BlogForm = () => {
	const dispatch = useDispatch();

	const title = useSelector(state => state.BlogForm.title);
	const author = useSelector(state => state.BlogForm.author);
	const url = useSelector(state => state.BlogForm.url);

	const handleTitleChange = (e) => {
		dispatch(setTitle(e.target.value));
	};

	const handleAuthorChange = (e) => {
		dispatch(setAuthor(e.target.value));
	};

	const handleUrlChange = (e) => {
		dispatch(setUrl(e.target.value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(createBlog({ title, author, url }));
		dispatch(setTitle(''));
		dispatch(setAuthor(''));
		dispatch(setUrl(''));
	};

	return (
		<div>
			<h2>create new blog</h2>
			<form onSubmit={handleSubmit}>
				<div>title<input type="text" value={title} name="title" placeholder="title"
								 onChange={handleTitleChange}/></div>
				<div>author<input type="text" value={author} name="author" placeholder="author"
								  onChange={handleAuthorChange}/></div>
				<div>url<input type="text" value={url} name="url" placeholder="url" onChange={handleUrlChange}/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default BlogForm;