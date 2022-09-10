import { createSlice } from '@reduxjs/toolkit';

const registerFormReducer = createSlice({
	name: 'RegisterForm',
	initialState: {
		username: '',
		name: '',
		password: ''
	},
	reducers: {
		setUsername(state, action) {
			state.username = action.payload;
		},
		setName(state, action) {
			state.name = action.payload;
		},
		setPassword(state, action) {
			state.password = action.payload;
		},
	}
});

export const { setUsername, setName, setPassword } = registerFormReducer.actions;
export default registerFormReducer.reducer;