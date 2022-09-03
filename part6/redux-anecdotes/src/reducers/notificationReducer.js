import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: 'notification',
	initialState: {
		message: null
	},
	reducers: {
		setMessage(state, action) {
			state.message = action.payload;
		},
		removeMessage(state) {
			state.message = null;
		}
	}
});

export const setNotification = (message, second) => {
	return async (dispatch) => {
		dispatch(setMessage(message));
		setTimeout(() => dispatch(removeMessage()), second * 1000);
	};
}

export const { setMessage, removeMessage } = notificationSlice.actions
export default notificationSlice.reducer