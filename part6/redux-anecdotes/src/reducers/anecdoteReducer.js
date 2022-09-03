import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: {
		anecdotes: []
	},
	reducers: {
		updateVote(state, action) {
			const id = action.payload;
			state.anecdotes.forEach(anecdote => {
				if (anecdote.id === id) {
					anecdote.votes += 1;
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

export const { updateVote, addAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer