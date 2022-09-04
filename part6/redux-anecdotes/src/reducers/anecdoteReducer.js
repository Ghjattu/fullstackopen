import { createSlice } from "@reduxjs/toolkit";
import anecdoteServices from "../services/anecdotes";

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: {
		anecdotes: []
	},
	reducers: {
		updateVote(state, action) {
			const updatedAnecdote = action.payload;
			state.anecdotes.forEach(anecdote => {
				if (anecdote.id === updatedAnecdote.id) {
					anecdote.votes = updatedAnecdote.votes;
				}
			});
		},
		addAnecdotes(state, action) {
			if (action.payload instanceof Array)
				state.anecdotes.push(...action.payload);
			else
				state.anecdotes.push(action.payload);
		}
	}
});

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteServices.getAll();
		dispatch(addAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteServices.createNew(content);
		dispatch(addAnecdotes(newAnecdote));
	};
};

export const updateAnecdoteVotes = (oldAnecdote) => {
	return async (dispatch) => {
		const newAnecdote = {...oldAnecdote, votes: oldAnecdote.votes + 1};
		const updatedAnecdote = await anecdoteServices.update(oldAnecdote.id, newAnecdote);
		dispatch(updateVote(updatedAnecdote));
	};
};

export const { updateVote, addAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer