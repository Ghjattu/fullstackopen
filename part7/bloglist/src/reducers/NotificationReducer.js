import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
	name: 'Notification',
	initialState: {
		message: null,
		timer: null
	},
	reducers: {
		setMessage(state, action) {
			state.message = action.payload;
		},
		removeMessage(state) {
			state.message = null;
		},
		setTimer(state, action) {
			state.timer = action.payload;
		},
		removeTimer(state) {
			clearTimeout(state.timer);
			state.timer = null;
		}
	}
});

export const setNotification = (message) => {
	return async (dispatch) => {
		dispatch(setMessage(message));
		dispatch(removeTimer());
		const timer = setTimeout(() => dispatch(removeMessage()), 3 * 1000);
		dispatch(setTimer(timer));
	};
};

export const { setMessage, removeMessage, setTimer, removeTimer } = notificationReducer.actions;
export default notificationReducer.reducer;