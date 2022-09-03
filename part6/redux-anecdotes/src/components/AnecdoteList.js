import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVote } from "../reducers/anecdoteReducer";
import { setMessage, removeMessage } from "../reducers/notificationReducer";

const AnecdoteList = () => {
	const dispatch = useDispatch();
	let filterText = useSelector(state => state.filter.text);
	if (filterText === null)
		filterText = '';
	filterText = filterText.toLowerCase();
	const anecdotes = [...useSelector(state => {
		return state.anecdotes.anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(filterText) !== -1);
	})];

	const vote = (id, content) => {
		dispatch(updateVote(id));
		dispatch(setMessage(`you voted '${content}'`));
		setTimeout(() => dispatch(removeMessage()), 5000);
	};

	return (
		<div>
			{anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
};

export default AnecdoteList