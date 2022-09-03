import React from "react";
import { addAnecdotes} from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setMessage, removeMessage } from "../reducers/notificationReducer";
import anecdoteServices from "../services/anecdotes";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = '';
		const newAnecdote = await anecdoteServices.createNew(content);
		dispatch(addAnecdotes(newAnecdote));
		dispatch(setMessage(`you created a new anecdote '${content}'`));
		setTimeout(() => dispatch(removeMessage()), 5000);
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