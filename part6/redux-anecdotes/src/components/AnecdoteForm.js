import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = '';
		props.createAnecdote(content);
		props.setNotification(`you created a new anecdote '${content}'`, 5);
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleSubmit}>
				<div><input name="anecdote"/></div>
				<button type="submit">create</button>
			</form>
		</div>
	)
};

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)