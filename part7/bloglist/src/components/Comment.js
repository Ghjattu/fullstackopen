import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comments, handleCommentSubmit }) => {
	const [comment, setComment] = useState('');

	const handleChange = (e) => {
		setComment(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		handleCommentSubmit(comment);
		setComment('');
	};

	return (
		<div>
			<h3>comments</h3>
			<form onSubmit={handleSubmit}>
				<input type="text" value={comment} onChange={handleChange}/>
				<button type="submit">add comment</button>
			</form>
			<ul>
				{comments.map((comment, index) => <li key={index}>{comment.body}</li>)}
			</ul>
		</div>
	);
};

Comment.propTypes = {
	comments: PropTypes.array,
	handleCommentSubmit: PropTypes.func
};

export default Comment;