import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setMessage, removeMessage } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createAnecdote(e.target.anecdote.value));
		dispatch(setMessage(`you created a new anecdote '${e.target.anecdote.value}'`));
		setTimeout(() => dispatch(removeMessage()), 5000);
		e.target.anecdote.value = '';
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

export default AnecdoteForm