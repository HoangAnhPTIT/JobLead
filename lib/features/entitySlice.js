import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	entities: {},
};

export const entitySlice = createSlice({
	name: "entity",
	initialState,
	reducers: {
		setEntities: (state, action) => {
			state.entities = action.payload;
		},
	},
});

export const { setEntities } = entitySlice.actions;

export default entitySlice.reducer;
