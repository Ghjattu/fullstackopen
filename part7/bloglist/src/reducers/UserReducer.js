import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';

const userReducer = createSlice({
	name: 'User',
	initialState: {
		user: null
	},
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		}
	}
});

export const login = (credentials) => {
	return async (dispatch) => {
		const user = await loginService.login(credentials);
		window.localStorage.setItem(
			'loggedBlogAppUser', JSON.stringify(user)
		);
		blogService.setToken(user.token);
		dispatch(setUser(user));
	};
};

export const logout = () => {
	return (dispatch) => {
		window.localStorage.removeItem('loggedBlogAppUser');
		dispatch(setUser(null));
	};
};

export const { setUser } = userReducer.actions;
export default userReducer.reducer;