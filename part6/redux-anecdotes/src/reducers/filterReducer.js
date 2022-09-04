import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
	name: 'filter',
	initialState: {
		text: null
	},
	reducers: {
		changeText(state, action) {
			state.text = action.payload;
		}
	}
})

export const { changeText } = filterSlice.actions
export default filterSlice.reducer