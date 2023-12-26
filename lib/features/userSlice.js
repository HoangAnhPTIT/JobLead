import { createSlice } from "@reduxjs/toolkit";
import { deleteAllCookies } from "src/helper/common";

const initialState = {
	isLogin: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setIsLogin: (state, action) => {
			state.isLogin = action.payload;
		},
		logout: (state) => {
			state.isLogin = false;
			deleteAllCookies();
		},
	},
});

export const { setIsLogin, logout } = userSlice.actions;

export default userSlice.reducer;
