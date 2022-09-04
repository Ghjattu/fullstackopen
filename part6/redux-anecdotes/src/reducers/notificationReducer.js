import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: 'notification',
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
			state.timer = action.payload
		},
		removeTimer(state) {
			clearTimeout(state.timer);
			state.timer = null;
		}
	}
});

export const setNotification = (message, second) => {
	return async (dispatch) => {
		dispatch(setMessage(message));
		dispatch(removeTimer());
		let timer = setTimeout(() => dispatch(removeMessage()), second * 1000);
		dispatch(setTimer(timer));
	};
}

export const { setMessage, removeMessage, setTimer, removeTimer } = notificationSlice.actions
export default notificationSlice.reducer