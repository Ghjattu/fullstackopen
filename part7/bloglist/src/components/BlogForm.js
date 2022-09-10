import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthor, setTitle, setUrl } from '../reducers/BlogFormReducer';
import { createBlog } from '../reducers/BlogsReducer';
import { Button, TextField } from '@mui/material';

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
				<div>
					<TextField label="title" variant="outlined" value={title} name="title"
							   size="small" margin="normal"
							   onChange={handleTitleChange}/>
				</div>
				<div>
					<TextField label="author" variant="outlined" value={author} name="author"
							   size="small" margin="normal"
							   onChange={handleAuthorChange}/>
				</div>
				<div>
					<TextField label="url" variant="outlined" value={url} name="url"
							   size="small" margin="normal"
							   onChange={handleUrlChange}/>
				</div>
				<Button variant="outlined" type="submit">create</Button>
			</form>
		</div>
	);
};

export default BlogForm;