import { createSlice } from '@reduxjs/toolkit';

const blogFormReducer = createSlice({
	name: 'BlogForm',
	initialState: {
		title: '',
		author: '',
		url: ''
	},
	reducers: {
		setTitle(state, action) {
			state.title = action.payload;
		},
		setAuthor(state, action) {
			state.author = action.payload;
		},
		setUrl(state, action) {
			state.url = action.payload;
		},
	}
});

export const { setTitle, setAuthor, setUrl } = blogFormReducer.actions;
export default blogFormReducer.reducer;