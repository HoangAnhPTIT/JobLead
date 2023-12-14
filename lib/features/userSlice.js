import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userInfo: null,
	isLogin: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.userInfo = action.payload?.userInfo;
			state.isLogin = action.payload?.isLogin;
		},
		logout: (state) => {
			state.userInfo = null;
			state.isLogin = false;
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
