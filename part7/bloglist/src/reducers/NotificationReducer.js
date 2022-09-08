import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
	name: 'Notification',
	initialState: {
		message: ''
	},
	reducers: {
		setMessage(state, action) {
			state.message = action.payload;
		},
	}
});

export const { setMessage } = notificationReducer.actions;
export default notificationReducer.reducer;