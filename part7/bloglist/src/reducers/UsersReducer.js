import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

/**
 * @description Save all registered users.
 * @type {Slice<{users: *[]}, {updateUsersInfo(*, *): void, setUsers(*, *): void, addUsers(*, *): void}, string>}
 */
const usersReducer = createSlice({
	name: 'Users',
	initialState: {
		users: []
	},
	reducers: {
		setUsers(state, action) {
			state.users = action.payload;
		},
		addUsers(state, action) {
			state.users.push(action.payload);
		},
		updateUsersInfo(state, action) {
			const savedBlog = action.payload;
			state.users.forEach(user => {
				if (user.id === savedBlog.user) {
					user.blogs.push(savedBlog);
				}
			});
		}
	}
});

export const initializeUsers = () => {
	return async (dispatch) => {
		const users = await usersService.getAll();
		dispatch(setUsers(users));
	};
};

export const register = (newUser) => {
	return async (dispatch) => {
		const savedUser = await usersService.register(newUser);
		dispatch(addUsers(savedUser));
	};
};

export const { setUsers, addUsers, updateUsersInfo } = usersReducer.actions;
export default usersReducer.reducer;