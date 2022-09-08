import { createSlice } from '@reduxjs/toolkit';

const loginFormReducer = createSlice({
	name: 'LoginForm',
	initialState: {
		username: '',
		password: ''
	},
	reducers: {
		setUsername(state, action) {
			state.username = action.payload;
		},
		setPassword(state, action) {
			state.password = action.payload;
		},
	}
});

export const { setUsername, setPassword } = loginFormReducer.actions;
export default loginFormReducer.reducer;