import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
};

export const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		updateLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
});

export const { updateLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
